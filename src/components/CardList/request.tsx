function RequestCardList(filter) {
    return fetch(`http://localhost:3333/api/cards/${filter}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return false
    })
        .catch((error) => {
            return false
        });

};

export default RequestCardList;
