import { useState } from 'react'
import * as S from "./style";

type APITesterProps = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    url: string
    host?: string
    pathParams?: Record<string, string>
    queryParams?: Record<string, string>
    headers?: Record<string, string>
    bodySchema?: Record<string, { type: string; required: boolean }>
    defaultBody?: Record<string, string>
}

export default function APITester(
    {
        method,
        url,
        host = '',
        pathParams = {},
        queryParams = {},
        headers = {},
        bodySchema = {},
        defaultBody = {},
    }: APITesterProps
) {
    const [response, setResponse] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const buildUrl = () => {
        let parsedUrl = url
        Object.entries(pathParams).forEach(([key, value]) => {
            parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(value))
        })
        const queryString = new URLSearchParams(queryParams).toString()
        return host + parsedUrl + (queryString ? `?${queryString}` : '')
    }

    const callApi = async () => {
        setLoading(true)
        try {
            const res = await fetch(buildUrl(), {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: method === 'GET' || method === 'DELETE' ? undefined : JSON.stringify(defaultBody),
            })

            const contentType = res.headers.get('content-type')
            const result = contentType?.includes('application/json') ? await res.json() : await res.text()

            setResponse(result)
        } catch (err) {
            setResponse({ error: String(err) })
        } finally {
            setLoading(false)
        }
    }

    return (
        <S.Container>
            <S.Section>
                <S.SettingWrapper>
                    <S.Method>{method}</S.Method>
                    <S.Url>{url}</S.Url>
                </S.SettingWrapper>

                <h4>Body</h4>
                {Object.entries(bodySchema).map(([key, { type, required }]) => (
                    <S.BodyField key={key}>
                        <code>{key}</code>: <span>{type}</span>
                        {required && <S.Required>required</S.Required>}
                    </S.BodyField>
                ))}

                <h4 style={{ marginTop: '1rem' }}>Responses</h4>
                <div style={{ color: '#16a34a', fontWeight: 600 }}>200 OK</div>
                <S.CodeBlock>{`{"access": "text"}`}
                </S.CodeBlock>
            </S.Section>
            <S.Section>
                <S.CodeBlock>
                    {method} {url} HTTP/1.1
                    <br />
                    Host: {host.replace(/^https?:\/\//, '')}
                    <br />
                    Content-Type: application/json
                    <br />
                    Accept: */*
                    <br />
                    <br />
                    {JSON.stringify(defaultBody, null, 2)}
                </S.CodeBlock>

                <S.Button onClick={callApi} disabled={loading}>
                    {loading ? 'Sending...' : 'Test it →'}
                </S.Button>

                {response && (
                    <>
                        <h4 style={{ marginTop: '1rem' }}>Response</h4>
                        <S.ResponseBox>{JSON.stringify(response, null, 2)}</S.ResponseBox>
                    </>
                )}
            </S.Section>
        </S.Container>
    )
}