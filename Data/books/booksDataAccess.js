const { NumberOfItemPerPage } = require("../../constant/generalVariable");
const Books = require("../Models/bookModel");

const popularBooksDB = async () => {
    try {
        return await Books.find().sort({ bbeScore: -1 }).limit(20);
    } catch (error) {
        throw error;
    }
};

//This Code does not work
const popularBookGenreDB = async (genre) => {
    try {
        // Below Commented code did not work i still can't figure out why
        // const data = await Books.find({ 'genres': { '$all': [genre] } }).sort({ bbeScore: -1 }).limit(2)
        const data = await Books.aggregate([
            { $match: { genres: { $in: [genre] } } },
            { $limit: 5 },
            {
                $sort: { bbeScore: -1 },
            },

        ])
        return data;
    } catch (error) {
        throw error;
    }
};

const multipleBooksDB = async (Multiplelist) => {
    try {
        const data = await Books.find({ _id: { $in: Multiplelist } })

        return data;
    } catch {
        throw error
    }
}

const searchBooksDB = async (searchTerm, skipPage) => {
    try {
        const data = await Books.aggregate([
            {
                $search: {
                    index: "searchIndexBooks",
                    compound: {
                        should: [
                            {
                                text: {
                                    query: searchTerm,
                                    path: "series",
                                    fuzzy: { maxEdits: 1 },
                                    score: { boost: { value: 11 } },
                                },
                            },
                            {
                                text: {
                                    query: searchTerm,
                                    path: "title",
                                    fuzzy: { maxEdits: 1 },
                                    score: { boost: { value: 3 } },
                                },
                            },
                            {
                                text: {
                                    query: searchTerm,
                                    path: "author",
                                    fuzzy: { maxEdits: 1 },
                                    score: { boost: { value: 10 } },
                                },
                            },
                            {
                                text: {
                                    query: searchTerm,
                                    path: ["description", "characters"],
                                    fuzzy: { maxEdits: 1 },
                                    score: { boost: { value: 5 } },
                                },
                            },
                        ],
                    },
                },
            },
            // { $limit: 5 },
            {
                $project: {
                    title: 1,
                    author: 1,
                    coverImg: 1,
                    price: 1,
                    score: { $meta: "searchScore" },
                },
            },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [{ $skip: skipPage }, { $limit: NumberOfItemPerPage }]
                }
            }
        ]);

        return data;
    } catch (error) {
        throw error
    }
};

const autoCompleteBooksDB = async (searchTerm) => {
    try {
        const data = await Books.aggregate([
            {

                $search: {
                    index: "autoCompleteBooks",
                    autocomplete: { query: searchTerm, path: "title", fuzzy: {} },

                }
            },
            { $limit: 6 },
            { $sort: { bbeScore: -1 } },
            { $project: { coverImg: 1, title: 1, author: 1, language: 1, rating: 1 } },
        ]);
        return data;
    } catch (error) {
        throw error
    }
};

const booksDetailDB = async (id) => {
    try {
        const data = await Books.findById(id)


        return data
    } catch (error) {
        throw error
    }
}

module.exports = {
    autoCompleteBooksDB,
    popularBooksDB,
    popularBookGenreDB,
    searchBooksDB,
    booksDetailDB,
    multipleBooksDB
};
