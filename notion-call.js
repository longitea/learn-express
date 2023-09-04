require('dotenv').config()

const callAPI = async () => {
    const result = await fetch(process.env.URL_NOTION, {
        headers: {
            Authorization: 'Bearer secret_k6bAuSSOfaxfXy90oDhaY9AWqsR5hgQ0mQpIJBVvtap',
            'Notion-Version': '2022-06-28',
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return result
}

console.log(callAPI());




