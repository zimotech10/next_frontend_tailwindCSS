import axiosClient from "@/api/axiosClient"

export const AuthService = {
    login: async ({publicKey, signedMessage} : any) => {
        return axiosClient.post(
            '/auth/loginWithSign',
            {
                publicKey, signedMessage
            }
        )
    },
    getAuthMessage: async () => {
        return axiosClient.get(
            '/auth/message',
        )
    }
}