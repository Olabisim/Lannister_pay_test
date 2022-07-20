export const split_payment = async (req, res, next) => {

        try {
                
                let Amount = req.body.Amount;

                const reqbody = {
                        ID: req.body.ID,
                        Amount: req.body.Amount,
                        Currency: req.body.Currency,
                        CustomerEmail: req.body.CustomerEmail,
                        SplitInfo: req.body.SplitInfo,
                }

                
                console.log("")
                console.log("Initial Balance: ")
                console.log(Amount)

                const mapSplitBreakdown = req.body.SplitInfo
                .sort((a,b) => {

                        const first = a.SplitType.toLowerCase();
                        const second = b.SplitType.toLowerCase();

                        if(first < second) {
                                return -1;
                        }
                        if(first > second) {
                                return 1;
                        }
                        return 0;
                })
                .map((e) => {

                        if(e.SplitType === "FLAT" || e.SplitType === "PERCENTAGE" || e.SplitType === "RATIO")
                        {
                                
                                console.log("")
                                console.log(`Split amount for "${e.SplitEntityId}" : ${e.SplitValue} `)
                                console.log(`Balance after split calculation for "${e.SplitEntityId}" : ( ${Amount} - ${e.SplitValue} ) `)
                                
                                Amount = Amount - e.SplitValue
                                console.log(Amount)
                                

                                return {
                                        SplitEntityId: e.SplitEntityId,
                                        Amount: e.SplitValue
                                }
                        }
                })
                .filter(curr => curr != undefined )

                
                console.log("")
                console.log(`Final Balance: ${Amount}`)

                const displayBody = {
                        
                        ID: req.body.ID,
                        Balance: Amount,
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

