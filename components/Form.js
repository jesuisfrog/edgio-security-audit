import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Papa from 'papaparse';

function DomainSearch() {
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);

    const apiEndpoint = 'https://ec2-18-218-210-20.us-east-2.compute.amazonaws.com:5000'

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiEndpoint}/wsra?domain=${domain}`);
                setResults(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        if (isLoading) {
            fetchData();
        }
    }, [isLoading, domain]);

    function formatData(data) {
        const columns = [
            {
                Header: 'Hostname',
                accessor: 'url',
            },
            {
                Header: 'WAF Detected',
                accessor: 'detected',
            },
            {
                Header: 'WAF Type',
                accessor: 'firewall',
            },
            {
                Header: 'Hosting Provider',
                accessor: 'manufacturer',
            },
        ];

        const rows = data.map((item) => ({
            url: item.url,
            detected: item.detected.toString(),
            firewall: item.firewall,
            manufacturer: item.manufacturer,
        }));

        return [columns, rows];
    }


    function Table({ data }) {
        const [columns, rows] = formatData(data);

        // useTable hook from react-table
        const { getTableProps, getTableBodyProps, headerGroups, rows: tableRows, prepareRow } = useTable({
            columns,
            data: rows,
        });

        // function to download the data in CSV format
        function downloadCSV() {
            const headers = headerGroups[0].headers.map((column) => column.Header);
            const csvRows = tableRows.map((row) =>
                row.cells.map((cell) => cell.value)
            );
            const csv = Papa.unparse({ fields: headers, data: csvRows });
            const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(csvData);
            link.setAttribute('download', 'data.csv');
            link.click();
        }


        return (
            <div>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {tableRows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className='button-container'>
                    <button className='download-button' onClick={downloadCSV}>Download CSV</button>
                </div>
                
            </div>
        );
    }

    // const exampleData = [
    //     {
    //         "url": "https://claimsonline.kemper.com",
    //         "detected": true,
    //         "firewall": "Generic",
    //         "manufacturer": "Unknown"
    //     },
    //     {
    //         "url": "https://careers.kemper.com",
    //         "detected": true,
    //         "firewall": "Cloudflare",
    //         "manufacturer": "Cloudflare Inc."
    //     },
    //     {
    //         "url": "https://www.kemper.com",
    //         "detected": false,
    //         "firewall": "None",
    //         "manufacturer": "None"
    //     },
    //     {
    //         "url": "https://wwwuat.kemper.com",
    //         "detected": false,
    //         "firewall": "None",
    //         "manufacturer": "None"
    //     }
    // ]

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <label className='text-white' >Domain:</label>
                        <input className='m-2'
                        type="text"
                        value={domain}
                        onChange={(event) => setDomain(event.target.value)}
                        />
                    
                    <button type="submit" className='search-button text-white'>Search</button>
                </div>
            </form>
            {isLoading && <p>Loading...</p>}
            {results.length > 0 && (
                <div>
                    <Table data={results} />
                </div>
            )}
        </div>
    );
}

export default DomainSearch;
