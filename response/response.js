class Response {
  tokenSuccessResp(message, data) {
    return {
      token: data,
      message: message,
    };
  }
  successListAllResp(message, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        data: data,
      },
    };
  }
  ticketSuccessSeedReset(message) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
      },
    };
  }
  ticketSuccessGetDataByStatusResp(message, status, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        status: status,
        data: data,
      },
    };
  }
  validationFailResp(message, error) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: message?.details,
        error: error,
      },
    };
  }
  tokenFailResp(message, error) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: message,
        error: error,
      },
    };
  }

  userSuccessGetDataStatusResp(message, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        data: data,
      },
    };
  }

  failResp(msg, err) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: msg,
        error: err,
      },
    };
  }
  cardSuccessGetAmountResp(message, balance) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        balance: balance,
      },
    };
  }
  cardSuccessGetDataByStatusResp(message, userDetail, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        userDetail: userDetail,
        data: data,
      },
    };
  }
}
export default new Response();
