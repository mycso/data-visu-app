'use client'

import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import AnimatedNumber from './AnimatedNumber'
import { getCountryCode } from '../lib/getCountryCode'
import Loading from './Loading'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Company = {
  id: number
  name: string
  country: string
  industry: string
  numberOfEmployees: number
}

const BarChartCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    fetch('https://dujour.squiz.cloud/developer-challenge/data')
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error(err))
  }, [])

  if (!companies.length) {
    return <div className="text-center mt-10 mx-auto"><Loading /></div>
  }

  const sorted = [...companies].sort((a, b) => b.numberOfEmployees - a.numberOfEmployees)

  const chartData = {
    labels: sorted.map((c) => c.name),
    datasets: [
      {
        label: 'Employees',
        data: sorted.map((c) => c.numberOfEmployees),
        backgroundColor: sorted.map((c) => {
          const countryColors: Record<string, string> = {
            'United States': '#2196F3',
            China: '#f44336',
            Indonesia: '#4CAF50',
            Canada: '#9C27B0',
            Malaysia: '#FFC107',
            Poland: '#009688',
            Vietnam: '#FF5722',
            Sweden: '#3F51B5',
            Kenya: '#8BC34A',
            Armenia: '#795548',
            Cuba: '#607D8B',
          }
          return countryColors[c.country] || '#9E9E9E'
        }),
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Company Employee Counts Chart`,
        font: { size: 24, family: 'Fjalla One', weight: 'bold', color: '#6a7282'},
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Employees' },
        grid: { display: false, drawBorder: false },
      },
      y: {
        ticks: { mirror: true, color: '#000', font: { weight: 'bold' } },
        grid: { display: false, drawBorder: false },
      },
    },
  } as any

  return (
    <div className="relative w-full max-w-[900px] h-[600px] mx-auto overflow-auto">
      <div className="flex items-center w-[700px]">
        <Bar data={chartData} options={options} height={500} />
        <div className="w-full flex flex-col justify-between h-[calc(100%-100px)] pr-2 pointer-events-none text-sm font-semibold">
          {sorted.map((company) => {
            const code = getCountryCode(company.country)
            return (
              <div key={company.id} className="flex-1 flex items-center gap-2">
                <div className="flex items-center gap-1 w-[180px]">
                  {code && (
                    <img
                      src={`https://flagcdn.com/w40/${code}.png`}
                      alt={company.country}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                  )}
                  <span className="truncate">{company.name}</span>
                </div>
                <AnimatedNumber value={company.numberOfEmployees} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BarChartCompanies