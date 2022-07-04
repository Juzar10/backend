const catchAsyncError = require("../middleware/catchAsyncError")
const { getPopularBooks, getPopularBooksGenre, getSearchBooks, getAutoCompleteBooks, getBooksDetail } = require("../service/books/booksService")


const searchBooks = catchAsyncError(async (req, res) => {

    let searchTerm = req.query.search
    let page = req.query.page

    const data = await getSearchBooks(searchTerm, page)

    res.status(200).json({
        message: "success",
        data: data
    })
})

const popularBooks = catchAsyncError(async (req, res) => {
    const data = await getPopularBooks()

    res.status(200).json({
        message: "success",
        data: data
    })
})

const PopularBookGenre = catchAsyncError(async (req, res, next) => {

    const genre = req.params.genre

    const data = await getPopularBooksGenre(genre)

    res.status(200).json({
        message: "success",
        data: data
    })

})

const autoCompleteBooks = catchAsyncError(async (req, res) => {
    let searchTerm = req.query.search
    const data = await getAutoCompleteBooks(searchTerm)

    res.status(200).json({
        message: "success",
        data: data
    })
})

const detailBook = catchAsyncError(async (req, res) => {

    let id = req.params.id

    const data = await getBooksDetail(id)

    res.status(200).json({
        message: "success",
        data: data
    })

})


module.exports = { popularBooks, PopularBookGenre, searchBooks, autoCompleteBooks, detailBook }