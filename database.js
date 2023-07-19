const books = [
    {
        ISBN:"12345Book",
        name:"Plotter",
        pubDate:"01-01-1969",
        numPage:"699",
        language:"Russian",
        author:[1,2],
        publication:[1],
        genre:["fiction", "fantasy", "abstract"]
    }
]

const author = [
    {
        ID:1,
        name:"Hello it's me",
        books:["Plotter", "kloster"]
    },
    {
        ID:2,
        name:"Hello it's me,agaim",
        books:["Plotter", "lobster"]
    }
]

const publication = [
    {
        ID:1,
        name:"A2Qpubs",
        books:["Plotter", "Wartman", "Shrimp"]
    },
    {
        ID:2,
        name:"Rajjo",
        books:[]
    }
]

module.exports = { books, author, publication}