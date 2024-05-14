export default function FinancialDataTable (data, title)  {
    if (!data || !data.annualReports || data.annualReports.length === 0) {
      return <p>No {title} data available</p>;
    }
  
    const annualReport = data.annualReports[0]; // Get latest annual report
  
    return (
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the keys and values of the report */}
          {Object.entries(annualReport).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };