export default {
    MAX_ATTACHMENT_SIZE : 5000000,
    s3: {
        BUCKET: "forever-notes"
     },
    apiGateway : {
        URL: "https://u0hrjn91qg.execute-api.us-west-2.amazonaws.com/prod",
        REGION: "us-west-2"
    },
    cognito : {
        USER_POOL_ID: 'us-west-2_GUg1t77Nr',
        APP_CLIENT_ID: '323kfhnc1nqhkd1ammhv1a5jfv',
        REGION: "us-west-2",
        IDENTITY_POOL_ID: "us-west-2:93051523-0455-4827-b739-158df6e183d1"
    }
};
