export const buildQuery = async function ({
  skip,
  limit,
  status,
  id,
  user_id,
  card_id,
}) {
  const aggregateQuery = [];

  // Match stage
  const matchStage = {};

  if (status) {
    matchStage.status = status;
  }

  if (id) {
    matchStage._id = id;
  }
  if (user_id) {
    matchStage.user_id = user_id;
  }
  if (card_id) {
    matchStage.card_id = card_id;
  }

  if (Object.keys(matchStage).length > 0) {
    aggregateQuery.push({ $match: matchStage });
  }

  aggregateQuery.push(
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "card_id",
        as: "transactions",
      },
    },
    {
      $unwind: {
        path: "$transactions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        cardNumber: 1,
        cardType: 1,
        balance: 1,
        expiryDate: 1,
        cvv: 1,
        isActive: 1,
        created_at: 1,
        transactions: { $arrayElemAt: ["$transactions", 0] },
      },
    },
  );

  // Skip and limit stages
  if (skip !== null && skip !== undefined) {
    aggregateQuery.push({ $skip: skip });
  }

  if (limit !== null && limit !== undefined) {
    aggregateQuery.push({ $limit: limit });
  }
  return aggregateQuery;
};
