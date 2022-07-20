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

                let mapSplitBreakdown = []
                // .sort((a,b) => {

                //         const first = a.SplitType.toLowerCase();
                //         const second = b.SplitType.toLowerCase();

                //         if(first < second) {
                //                 return -1;
                //         }
                //         if(first > second) {
                //                 return 1;
                //         }
                //         return 0;
                // })
                // .filter(e => e.SplitType === "FLAT")

                                        
                console.log("")
                console.log("FLAT TYPES FIRST")

                // logic for calculating flat

                const flatMapSplitBreakdown = req.body.SplitInfo.filter(e => e.SplitType === "FLAT").map((e) => {

                                        console.log(`Split amount for "${e.SplitEntityId}" : ${e.SplitValue} `)
                                        console.log(`Balance after split calculation for "${e.SplitEntityId}" : ( ${Amount} - ${e.SplitValue} ) `)
                                        
                                        mapSplitBreakdown.push({
                                                SplitEntityId: e.SplitEntityId,
                                                Amount: e.SplitValue
                                        })
                                        Amount = Amount - e.SplitValue
                                        console.log(Amount)
                                        console.log("")
        
                        })
                         
                console.log("")
                console.log("PERCENTAGE TYPES COME NEXT")
                
                // logic for calculating percentage

                const percentageMapSplitBreakdown = req.body.SplitInfo.filter(e => e.SplitType === "PERCENTAGE").map((e) => {


                                let percentageNumber = (Number(e.SplitValue) / 100 * Amount).toFixed(1);
                                console.log(`Split amount for "${e.SplitEntityId}" : (${e.SplitValue} % OF ${Amount}) = ${percentageNumber} `)
                                
                                console.log(`Balance after split calculation for "${e.SplitEntityId}" : ( ${Amount} - ${percentageNumber} ) `)
                                Amount = Amount - percentageNumber

                                console.log(Amount)
                                console.log("")
                                mapSplitBreakdown.push({
                                        SplitEntityId: e.SplitEntityId,
                                        Amount: percentageNumber
                                })

                })

                console.log("")
                console.log("FINALLY, RATIO TYPES")
                console.log(`Opening Ratio Balance = ${Amount}`)
                let totalRatio = 0; 

                // getting the total ratio 

                const totalRatioMapSplitBreakdown = req.body.SplitInfo.filter(e => e.SplitType === "RATIO").map((e) => {

                        totalRatio += e.SplitValue
                })
                console.log(totalRatio)

                let Amount2 = Amount

                // logic for calculating ratio

                const RatioMapSplitBreakdown = req.body.SplitInfo.filter(e => e.SplitType === "RATIO").map((e) => {

                        
                        // Split amount for "LNPYACC0011": ((3/5) * 1396.8) = 838.08
                        // Balance after split calculation for "LNPYACC0011": (1396.8 - (838.08))
                        // 558.72

                        let ratioAmount = (Number(e.SplitValue) / totalRatio * Amount2).toFixed(2);
                        console.log(`Split amount for "${e.SplitEntityId}" : ((${e.SplitValue} / ${totalRatio}) * ${Amount2}) = ${ratioAmount} `)
                        console.log(`Balance after split calculation for "${e.SplitEntityId}" : ( ${Amount} - ${ratioAmount} ) `)
                        Amount = (Amount - ratioAmount).toFixed(2)

                        console.log(Amount)
                        console.log("")
                        mapSplitBreakdown.push({
                                SplitEntityId: e.SplitEntityId,
                                Amount: ratioAmount
                        })
                })

                
                console.log("")
                Amount = Amount
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

