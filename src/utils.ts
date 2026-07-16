// import Papa from 'papaparse'

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(' ')
}

// function formatDate(date: Date): string {
//     return new Intl.DateTimeFormat('en-US', {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric',
//     }).format(date)
// }

// interface EServiceRow {
//     id: string
//     name: string
//     description: string
//     technology: string
//     producerId: string
//     producerName: string
//     producerFiscalCode: string
//     producerIpaCode: string
//     attributes: string
//     activeDescriptorId: string
//     activeDescriptorState: string
//     activeDescriptorVersion: string
// }

// async function getStats() {
//     const tenantsDataSource =
//         'https://raw.githubusercontent.com/italia/pdnd-opendata/main/data/aderenti.csv'
//     const eservicesDataSource =
//         'https://raw.githubusercontent.com/italia/pdnd-opendata/main/data/eservice_a_catalogo.csv'
//     const connectionsDataSource =
//         'https://raw.githubusercontent.com/italia/pdnd-opendata/main/data/connessioni_totali.csv'
//     const sessionsDataSource =
//         'https://raw.githubusercontent.com/italia/pdnd-opendata/main/data/totale_richieste_di_accesso.csv'

//     try {
//         const responses = await Promise.all([
//             fetch(tenantsDataSource),
//             fetch(eservicesDataSource),
//             fetch(connectionsDataSource),
//             fetch(sessionsDataSource),
//         ])

//         const [tenantsCSV, eservicesCSV, connectionCSV, sessionsCSV] =
//             await Promise.all(responses.map((response) => response.text()))

//         const tenantsRows = tenantsCSV.split('\n')
//         const eservicesRows = Papa.parse<EServiceRow>(eservicesCSV, {
//             header: true,
//             skipEmptyLines: true,
//         }).data
//         const connectionRows = connectionCSV.split('\n')
//         const sessionsRows = sessionsCSV.split('\n')

//         let tenants = 0
//         let eservices = 0
//         let connections = parseInt(connectionRows[1].split(',')[0])
//         let sessions =
//             Math.trunc((parseInt(sessionsRows[1].split(',')[0]) / 1e9) * 10) /
//             10

//         tenantsRows.forEach(() => tenants++)

//         tenants -= 1

//         eservicesRows.forEach((eservice) => {
//             if (eservice['activeDescriptorState'] === 'PUBLISHED') eservices++
//         })

//         return {
//             tenants,
//             eservices,
//             connections,
//             sessions,
//         }
//     } catch (e) {
//         return null
//     }
// }

export { joinClasses }
