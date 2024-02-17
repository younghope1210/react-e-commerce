
const categorys = [
    {
        "_id": 1,
        "name": "france"
    },
    {
        "_id": 2,
        "name": "germany"
    },
    {
        "_id": 3,
        "name": "italy"
    },
    {
        "_id": 4,
        "name": "america"
    },
    {
        "_id": 5,
        "name": "korea"
    },
    {
        "_id": 6,
        "name": "spain"
    },
    {
        "_id": 7,
        "name": "united kingdom"
    }
]

const prices = [
    {
        "_id": 0,
        "name": "All",
        "array": []
    },
    {   
        "_id": 1,
        "name": "10000 ~ 19999원",
        "array": [10000, 19999]
    },
    {
        "_id": 2,
        "name": "20000 ~ 29999원",
        "array": [20000, 29999]
    },
    {
        "_id": 3,
        "name": "30000 ~ 39999원",
        "array": [30000, 39999]
    },
    {
        "_id": 4,
        "name": "40000 ~ 49999원",
        "array": [40000, 49999]
    },
    {
        "_id": 5,
        "name": "50000원 이상",
        "array": [50000, 1500000]
    }
]

export {
    categorys,
    prices
}
