const toPaginate = async (model, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalItems = await model.countDocuments().exec();

  const totalPages = Math.ceil(totalItems / limit);

  try {
    const results = await model.find().limit(limit).skip(startIndex).exec();
    // console.log(results);
    return {
      data: results,
      totalItems,
      totalPages: totalPages,
      currentPageNumber: page,
      currentPageSize: results.length,
      previousPage: page - 1 > 0 ? page - 1 : null,
      nextPage: page + 1 <= totalPages ? page + 1 : null,
    };
    // next();
  } catch (e) {
    console.log(e);
    return { error: "error", message: e.message };
  }
};

module.exports = toPaginate;
