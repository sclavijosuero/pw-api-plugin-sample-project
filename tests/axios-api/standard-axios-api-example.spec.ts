import { expect, test } from '@playwright/test';
import axios from 'axios';


test.describe('AXIOS STANDARD API Tests for https://jsonplaceholder.typicode.com', () => {

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    test('Verify axios API GET, HEAD, POST, PUT, PATCH, DELETE in single test', async () => {

        // ✔️ Example of get
        const responseGet = await axios.get(`${baseUrl}/posts/1`)
        expect(responseGet.status).toBe(200)
        const responseBodyGet = await responseGet.data
        expect(responseBodyGet).toHaveProperty('id', 1)


        // ✔️ Example of head
        const responseHead = await axios.head(`${baseUrl}/posts/1`)
        expect(responseHead.status).toBe(200)


        // ✔️ Example of post (with request: body, headers, params)
        const responsePost = await axios.post(`${baseUrl}/posts`,
            {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        expect(responsePost.status).toBe(201)
        const responseBodyPost = await responsePost.data
        expect(responseBodyPost).toHaveProperty('id', 101)


        // ✔️ Example of put (with request body and request headers)
        const responsePut = await axios.put('https://jsonplaceholder.typicode.com/posts/1',
            {
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                params: { _limit: 1000, _details: true },
                timeout: 2000
            }
        )
        expect(responsePut.status).toBe(200)
        const responseBodyPut = await responsePut.data
        expect(responseBodyPut).toHaveProperty('id', 1)


        // ✔️ Example of patch (with request body and request headers)
        const responsePatch = await axios.patch('https://jsonplaceholder.typicode.com/posts/1',
            {
                title: 'hello',
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        expect(responsePatch.status).toBe(200)


        // ✔️ Example for delete
        const responseDelete = await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
        expect(responseDelete.status).toBe(200)

    })


    test('Verify axios API REQUEST (using default GET)', async () => {

        // ✔️ Example fetch (default GET)
        const responseRequest = await axios.request({ url: `${baseUrl}/posts`, params: { _limit: 20000, _details: true }})
        expect(responseRequest.status).toBe(200)
        const responseBodyRequest = await responseRequest.data
        expect(responseBodyRequest.length).toBeGreaterThan(4)

    })


    test('Verify axios API POST with body, headers, params, timeout, responseType, auth', async () => {

        // ✔️ Example of post (with request: body, headers, params, timeout)
        const responsePost = await axios.post(`${baseUrl}/posts`,
            {
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                params: { _limit: 1000, _details: true },
                timeout: 2000,
                responseType: 'json',
                auth: {
                    username: 'john.wick',
                    password: 'babayaga'
                },
            }
        )
        expect(responsePost.status).toBe(201)
        const responseBodyPost = await responsePost.data
        expect(responseBodyPost).toHaveProperty('id', 101)

    })


    test('Verify axios API for methods axios(config) and axios(url, config)', async ({ page }) => {

        // ✔️ Example of axios(config)
        const responseAxios1 = await axios({ url: `${baseUrl}/posts/1`, params: { _details: true },
            validateStatus: (status: number) => status === 200
        })
        expect(responseAxios1.status).toBe(200)
        const responseBodyAxios1 = await responseAxios1.data
        expect(responseBodyAxios1).toHaveProperty('id', 1)

        // ✔️ Example of axios(url, config)
        const responseAxios2 = await axios(`${baseUrl}/posts/1`, { params: { _getid: true }})
        expect(responseAxios2.status).toBe(200)
        const responseBodyAxios2 = await responseAxios2.data
        expect(responseBodyAxios2).toHaveProperty('id', 1)

    })


    test('Verify axios API for Failing GET Method (404)', async ({ page }) => {

        // ❌ Example for get with wrong URL
        const responseFetch = await axios.get(`${baseUrl}/this-is-a-non-sense-endpoint`,
            { validateStatus: (status: number) => status === 404 }
        )
        expect(responseFetch.status).toBe(404)

    })
})
