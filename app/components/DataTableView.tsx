"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Loading from "./Loading";
import { getCountryCode } from "../lib/getCountryCode";

type Company = {
    name: string;
    country: string;
    industry: string;
    numberOfEmployees: number;
};

const PAGE_SIZE = 5;

const DataTableView = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [industry, setIndustry] = useState("");
    const [sortField, setSortField] = useState<"name" | "numberOfEmployees">("name");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)


    const endOfListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setLoading(true)
        fetch("https://dujour.squiz.cloud/developer-challenge/data")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("Failed to load data:", err))
            .finally(() => setLoading(false));
    }, []);

    const countries = Array.from(new Set(companies.map((d) => d.country)));
    const industries = Array.from(new Set(companies.map((d) => d.industry)));

    const filteredData = useMemo(() => {
        let result = companies;

        if (search) {
            result = result.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (country) {
            result = result.filter((d) => d.country.toLowerCase() === country.toLowerCase());
        }
        if (industry) {
            result = result.filter((d) => d.industry.toLowerCase() === industry.toLowerCase());
        }

        result = [...result].sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];

            if (typeof valA === "string" && typeof valB === "string") {
                return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            if (typeof valA === "number" && typeof valB === "number") {
                return sortDir === "asc" ? valA - valB : valB - valA;
            }
            return 0;
        });

        return result;
    }, [companies, search, country, industry, sortField, sortDir]);

    const visibleData = filteredData.slice(0, page * PAGE_SIZE);

    useEffect(() => {
        if (!endOfListRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (visibleData.length < filteredData.length) {
                        setPage((prev) => prev + 1);
                    }
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(endOfListRef.current);

        return () => {
            if (endOfListRef.current) observer.unobserve(endOfListRef.current);
        };
    }, [visibleData.length, filteredData.length]);

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full text-gray-500">

            {/* Filters */}
            <aside className="md:w-1/4 w-full bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="font-bold mb-3">Filters</h2>

                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />

                <label className="block mb-2 font-medium">Country</label>
                <select
                    className="w-full mb-3 p-2 border rounded"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">All</option>
                    {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium">Industry</label>
                <select
                    className="w-full mb-3 p-2 border rounded"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                >
                    <option value="">All</option>
                    {industries.map((i) => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium">Sort By</label>
                <select
                    className="w-full mb-3 p-2 border rounded"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as "name" | "numberOfEmployees")}
                >
                    <option value="name">Name</option>
                    <option value="numberOfEmployees">Employees</option>
                </select>

                <button
                    onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded"
                >
                    {sortDir === "asc" ? "Ascending" : "Descending"}
                </button>
            </aside>

            {/* Results */}
            <section className="md:w-3/4 w-full flex flex-col gap-4">
                <h1 className="fjalla text-2xl font-bold mb-4">Company Employee Counts</h1>

                {loading ? (
                    <div className="mx-auto py-10"><Loading /></div>
                ) : visibleData.length === 0 ? (
                    <p className="text-gray-500 italic">No results found.</p>
                ) : (
                    <>
                        {visibleData.map((company, idx) => (
                            <div
                                key={`${company.name}-${company.country}-${company.industry}-${idx}`}
                                className="p-4 border rounded-lg shadow-sm bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <h3 className="text-lg font-bold">{company.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        {getCountryCode(company.country) && (
                                            <img
                                                src={`https://flagcdn.com/w20/${getCountryCode(company.country)}.png`}
                                                alt={company.country}
                                                className="w-5 h-4 object-cover rounded-sm"
                                            />
                                        )}
                                        <span>{company.industry} • {company.country}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Employees</p>
                                    <p className="text-xl font-semibold">{company.numberOfEmployees.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-center py-4 block"><Loading /></div>}
                        <div ref={endOfListRef} className="h-10" />
                    </>
                )}
            </section>
        </div>
    );
};

export default DataTableView;
