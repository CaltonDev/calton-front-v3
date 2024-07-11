export interface Config {
    [key: string]: string
}

export function getConfig() {
    const host = window.location.hostname

    switch (host) {
        case 'localhost':
        case '0.0.0.0':
        case '127.0.0.1':
        case 'beta.calton.io':
            return {
                //apiUrl: 'http://localhost:5004',
                apiUrl: 'https://api-voixhub-test.herokuapp.com',
                apiFeedback:
                    'https://0cw80g2gd3.execute-api.eu-south-1.amazonaws.com/beta/',
                apiAnalAdvTopic:
                    'https://8892p4dlh8.execute-api.eu-south-1.amazonaws.com/',
                grafoLambda:
                    'https://r5wnlodnu1.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisStandard:
                    'https://xmx4u97h6l.execute-api.eu-south-1.amazonaws.com/',
                //apiSource: "https://di4nr4v7pc.execute-api.eu-south-1.amazonaws.com/",
                apiSource: 'http://localhost:5004',
                apiAnalysisGeneric:
                    'https://4qc0cidn9g.execute-api.eu-south-1.amazonaws.com/',
                apiInfos:
                    'https://u5rcdcnwc5.execute-api.eu-south-1.amazonaws.com/',
                apiTopic:
                    'https://mq0ddo7604.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisAvaComp:
                    'https://jsn69fso29.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisComp:
                    'https://mktqvykeeb.execute-api.eu-south-1.amazonaws.com/',
                tripScraper:
                    'https://h6hjhr9fsj.execute-api.eu-south-1.amazonaws.com/',
                trustedShopsScraper:
                    'https://uevjqpdlj9.execute-api.eu-south-1.amazonaws.com/',
                indeedScraper:
                    'https://zz742an0ai.execute-api.eu-south-1.amazonaws.com/',
                theforkScraper:
                    'https://fa3ct11x3i.execute-api.eu-south-1.amazonaws.com/',
                justeatScraper:
                    'https://yi4yh0f3c6.execute-api.eu-south-1.amazonaws.com/',
                googleApi:
                    'https://s1aspwl2hk.execute-api.eu-south-1.amazonaws.com/',
                googleScraper:
                    'https://gfmo9bq012.execute-api.eu-south-1.amazonaws.com/',
                amazonScraper:
                    'https://kxp455u4t4.execute-api.eu-south-1.amazonaws.com/',
                facebookApi:
                    'https://73snkqmezb.execute-api.eu-south-1.amazonaws.com/',
                trustpilotApi:
                    'https://yqxyy1nbxi.execute-api.eu-south-1.amazonaws.com/',
                startCore:
                    'http://ojzu0vaoe8.execute-api.eu-south-1.amazonaws.com/',
                apiReport:
                    'https://b5oroxyz10.execute-api.eu-south-1.amazonaws.com/',
                apiListings:
                    'https://u5be1o2e0m.execute-api.eu-south-1.amazonaws.com/',
                //apiListings: "http://localhost:5004/localPosts/"
                //apiListings: "http://localhost:5006/"
                // googleApi: 'http://localhost:5004/',
                // nuova gestione
                //apiUrl: 'https://api-voixhub-test.herokuapp.com'
            }
        case 'demo-cf.calton.io':
            return {
                apiUrl: 'https://api-voixhub-pre-prod-bc4668a1703b.herokuapp.com',
                apiFeedback:
                    'https://d7d1wdrs9g.execute-api.eu-south-1.amazonaws.com/dev/',
                apiAnalAdvTopic:
                    'https://tua7nsj2wi.execute-api.eu-south-1.amazonaws.com/',
                grafoLambda:
                    'https://5gpsxl6tnk.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisStandard:
                    'https://twie8a17e6.execute-api.eu-south-1.amazonaws.com/',
                apiSource:
                    'https://20t4dfoas6.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisGeneric:
                    'https://wamepdxy68.execute-api.eu-south-1.amazonaws.com/',
                apiInfos:
                    'https://vr3prahzf1.execute-api.eu-south-1.amazonaws.com/',
                apiTopic:
                    'https://vxkp8e1hri.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisAvaComp:
                    'https://k54xhxxbsc.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisComp:
                    'https://jabpf9cbce.execute-api.eu-south-1.amazonaws.com/',
                tripScraper:
                    'https://ja2i7typod.execute-api.eu-south-1.amazonaws.com/',
                trustedShopsScraper:
                    'https://gx3dmxadpl.execute-api.eu-south-1.amazonaws.com/',
                indeedScraper:
                    'https://rsoyn7fo83.execute-api.eu-south-1.amazonaws.com/',
                theforkScraper:
                    'https://8qid6vluy5.execute-api.eu-south-1.amazonaws.com/',
                justeatScraper:
                    'https://u3ccv9vnx0.execute-api.eu-south-1.amazonaws.com/',
                googleApi:
                    'https://7hngt2d7y8.execute-api.eu-south-1.amazonaws.com/',
                googleScraper:
                    'https://2qq5keffs9.execute-api.eu-south-1.amazonaws.com/',
                amazonScraper:
                    'https://4p37px1owg.execute-api.eu-south-1.amazonaws.com/',
                facebookApi:
                    'https://yhkho70w94.execute-api.eu-south-1.amazonaws.com/',
                trustpilotApi:
                    'https://ekzowyjvj9.execute-api.eu-south-1.amazonaws.com/',
                startCore:
                    'https://sdmy6kj43i.execute-api.eu-south-1.amazonaws.com/',
                apiReport:
                    'https://6ejcfxvb1d.execute-api.eu-south-1.amazonaws.com/',
                apiListings:
                    'https://2qka5n4k81.execute-api.eu-south-1.amazonaws.com/',
            }
        default:
            return {
                apiUrl: 'https://api-voixhub-prod.herokuapp.com',
                apiFeedback:
                    'https://q5q73zhkd3.execute-api.eu-south-1.amazonaws.com/prod/',
                apiAnalAdvTopic:
                    'https://tua7nsj2wi.execute-api.eu-south-1.amazonaws.com/',
                grafoLambda:
                    'https://l7s3m6xqpk.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisStandard:
                    'https://gh9bq98mhi.execute-api.eu-south-1.amazonaws.com/',
                apiSource:
                    'https://lilim6wlg8.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisGeneric:
                    'https://wamepdxy68.execute-api.eu-south-1.amazonaws.com/',
                apiInfos:
                    'https://vr3prahzf1.execute-api.eu-south-1.amazonaws.com/',
                apiTopic:
                    'https://vxkp8e1hri.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisAvaComp:
                    'https://k54xhxxbsc.execute-api.eu-south-1.amazonaws.com/',
                apiAnalysisComp:
                    'https://jabpf9cbce.execute-api.eu-south-1.amazonaws.com/',
                tripScraper:
                    'https://lj48r03u9b.execute-api.eu-south-1.amazonaws.com/',
                trustedShopsScraper:
                    'https://7x1gf34wy6.execute-api.eu-south-1.amazonaws.com/',
                indeedScraper:
                    'https://sgya3zthre.execute-api.eu-south-1.amazonaws.com/',
                theforkScraper:
                    'https://vaooq75l6g.execute-api.eu-south-1.amazonaws.com/',
                justeatScraper:
                    'https://b8zul8lsy6.execute-api.eu-south-1.amazonaws.com/',
                googleApi:
                    'https://6wpsbr51gg.execute-api.eu-south-1.amazonaws.com/',
                googleScraper:
                    'https://2av8qj0l8a.execute-api.eu-south-1.amazonaws.com/',
                amazonScraper:
                    'https://nzrw182nml.execute-api.eu-south-1.amazonaws.com/',
                facebookApi:
                    'https://0c2wvq1cy5.execute-api.eu-south-1.amazonaws.com/',
                trustpilotApi:
                    'https://mn98z2oysi.execute-api.eu-south-1.amazonaws.com/',
                startCore:
                    'https://saqcqj2n97.execute-api.eu-south-1.amazonaws.com/',
                apiReport:
                    'https://xbil4ozb3f.execute-api.eu-south-1.amazonaws.com/',
                apiListings:
                    'https://utvydd7sga.execute-api.eu-south-1.amazonaws.com/',
            }
    }
}
