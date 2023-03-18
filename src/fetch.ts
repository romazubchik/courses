export const getDataFromApi = async (url: string) => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTBhYWUyZi0zMGIzLTRmYjEtODYxYy00OTQwNmQzNjc1ZGQiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3OTUwMTcsImV4cCI6MTY3OTY5NTAxN30.x26Q_0zZqwbLzVK5e_-6aCLVjN4_hC_pNF60pUOUnFg')

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    const res = await fetch(url, requestOptions)
    return res.json()
}