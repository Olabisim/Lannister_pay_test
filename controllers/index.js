export const split_payment = async (req, res, next) => {

        try {
                
                const reqbody = {
                        ID: req.body.ID,
                        Amount: req.body.Amount,
                        Currency: req.body.Currency,
                        CustomerEmail: req.body.CustomerEmail,
                        SplitInfo: req.body.SplitInfo,
                }
                const mapSplitBreakdown = req.body.SplitInfo.map((e, i) => {
                        if(e.SplitType === "FLAT" || e.SplitType === "PERCENTAGE" || e.SplitType === "RATIO")
                        {

                                return {
                                        SplitEntityId: e.SplitEntityId,
                                        Amount: 2000
                                }
                        }
                        else {
                                return {
                                        default: "splitType must be flat percentage or ratio"
                                }
                        }
                })
                const displayBody = {
                        
                        ID: req.body.ID,
                        Balance: 0,
                        SplitBreakdown: mapSplitBreakdown
                }
                
                res.status(201).json({
                        status: "success",
                        message: "endpoint successfully accepted it",
                        data: {
                                displayBody
                        }
                })
        
        }
        catch (err) {
                err.statusCode = 400;
                err.status = "failed";
                return next(err);
        }
}

