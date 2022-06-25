import { BASE_URL } from "./BlogService"

const AuthServices = {
    getUserByEmail: (userEmail) => fetch(`${BASE_URL}/users?email=${userEmail}`),
    updateUserDetails: (userId, userDetails) => fetch(`${BASE_URL}/users/${userId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }),
}

export default AuthServices