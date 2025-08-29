export const getCountryCode = (country: string) => {
    const mapping: Record<string, string> = {
        'China': 'cn',
        'India': 'in',
        'United States': 'us',
        'Indonesia': 'id',
        'Pakistan': 'pk',
        'Brazil': 'br',
        'Nigeria': 'ng',
        'Bangladesh': 'bd',
        'Russia': 'ru',
        'Mexico': 'mx',
        'Japan': 'jp',
        'Ethiopia': 'et',
        'Philippines': 'ph',
        'Egypt': 'eg',
        'Vietnam': 'vn',
        'Cuba': 'cu',
        'Canada': 'ca',
        'Malaysia': 'my',
        'Poland': 'pl',
        'Armenia': 'am',
        'Sweden': 'se',
        'Kenya': 'ke',
    };
    return mapping[country] || '';
}
