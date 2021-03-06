import { authHeader, config } from '../_helpers';
import { userService } from './user.service';

export const packagesService = {
    getAll,
    updateAll,
    updateSelected
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config().apiUrl}packages/`, requestOptions).then(handleResponse);
}

function updateAll() {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };

    return fetch(`${config().apiUrl}packages/`, requestOptions).then(handleResponse);
}

function updateSelected(selectedPackages) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(selectedPackages)
    };

    return fetch(`${config().apiUrl}packages/selected/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // auto logout if 401|403 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}