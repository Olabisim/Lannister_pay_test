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

                let Amount2;



                // Initial Balance: 
                // 4500

                // Split amount for "LNPYACC0019": 450
                // Balance after split calculation for "LNPYACC0019": (4500 - 450)
                // 4050

                // Split amount for "LNPYACC0011": 2300
                // Balance after split calculation for "LNPYACC0011": (4050 - 2300)
                // 1750

                // Final Balance: 1750

                
                console.log("")
                console.log("Initial Balance: ")
                console.log(Amount)

                const mapSplitBreakdown = req.body.SplitInfo.map((e, i) => {

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
                        else {
                                return {
                                        default: "splitType must be flat percentage or ratio"
                                }
                        }
                })

                
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

