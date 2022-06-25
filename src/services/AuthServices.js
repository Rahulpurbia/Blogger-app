import { BASE_URL } from "./BlogService"

const AuthServices = {
    getUserByEmail: (userEmail) => fetch(`${BASE_URL}/users?email=${userEmail}`),
    createUser: (userDetails) => fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    }),
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