const axios2 = require("axios");

const axios = {
    post: async (...args) =>{
        try {
            const res = await axios2.post(...args)
            return res
        }
        catch(e){
            return e.response
        }
    },
    get: async (...args) =>{
        try {
            const res = await axios2.get(...args)
            return res
        }
        catch(e){
            return e.response
        }
    },
    put: async (...args) =>{
        try {
            const res = await axios2.put(...args)
            return res
        }
        catch(e){
            return e.response
        }
    },
    delete: async (...args) =>{
        try {
            const res = await axios2.delete(...args)
            return res
        }
        catch(e){
            return e.response
        }
    }
}
BACKEND_URL = "http://localhost:3000"
WS_URL = "http://localhost:3001"
describe('Authentication',()=>{
    test('User to be able to signup only once',async ()=>{
        
       const username = `surya-${Math.random()}`
       const password = "password";
       const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password,
        type: "admin" // or user
       })
       expect(response.status).toBe(200)
       const UpdatesResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password,
        type: "admin"
       })
       expect(UpdatesResponse.status).toBe(400)
    })
    test('Signup request fails if the username fails',async ()=>{
        const username =`surya-${Math.random()}`
        const password = "1233456"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            password
           })
        expect(response.status).toBe(400)
    })
    test('Signin success if username and password are correct',async ()=>{
        const username = `surya-${Math.random()}`
        const password = '123456'
        const type = 'admin'
        await axios.post(`${BACKEND_URL}/api/v1/signup`,()=>{
            username,
            password,
            type
        })
       try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,()=>{
            username,
            password,
            type
        })
        expect(response.status).toBe(200)
       }catch(err){
        console.log(err)
       }
    })
    test('Signin fails if username and password are incorrect', async () => {
        const username = `surya-${Math.random()}`
        const password = "123456";
    
        // Simulate sign-up request (if needed for the test)
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            params: { username, password }
        });
    
        // Simulate sign-in request with incorrect credentials
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            params: { username, password }
        });
    
        // Expect status 400 for incorrect login
        expect(response.status).toBe(400);
    });
    
})

// describe('User information endpoints',()=>{
//     const token = ""
//     const avatarId = ""
//     beforeAll(async ()=>{
//         //runs before all the test runs only once
//         const username =    `kirat-${Math.random()}`
//         const password = '123456'
//         await axios.get(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : 'admin'
//         }) ;
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            
//                 "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//                 "name": "Timmy"
            
//         },{
//             headers : {
//                 "authorization":   `Bearer ${token}`
//             }
//         })
//         expect(response.statusCode).toBe(200)
//     })

//     test("User can't update their metadata due to wrong avatarId",async ()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//             avatarId
//     })
//         expect(response).toBe(400)
//     })
//     test('User can update their metadata with right avatarId',async ()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//             avatarId
//     }, {
//         headers: {
//         'Authorization' : `Bearer + ${token}`
//         }
//     })
//     expect(response).toBe(200)
//     })
//     test('User is not able to update their metadata if username and passowrd is not present ',async ()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//             avatarId
//     })
//     expect(response).toBe()
//     })
// })
// describe('Get user avatar information',()=>{
//     let avatarId;
//     let token;
//     let userId;
//     beforeAll(async ()=>{
//         //runs before all the test runs only once
//         const username =    `kirat-${Math.random()}`
//         const password = '123456'
//        const Signupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : 'admin'
//         }) ;
//         const response = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//             username,
//             password
//         })
//         userId = Signupresponse.data.userId
//         token = response.data.token
//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            
//                 "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//                 "name": "Timmy"
            
//         },{
//             headers : {
//                 "authorization":   `Bearer ${token}`
//             }
//         })
//         expect(response.statusCode).toBe(200)
//     })
//     test('get back avatar information for a user',async ()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=${userId}`);
//         expect(response.data.avatars.length).toBe(1);
//         expect(response.data.avatars[0].userId).toBe(userId)
//     })
//     test('Get the list of avatars created',async ()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/avatars`);
//         expect(response.data.avatars.length).not.toBe(0)
//         const currentAvatar = response.data.avatars.find(x => x.id == avatarId)
//         expect(currentAvatar).toBeDefined();
//     })
// })

// describe('Space informations endpoints',()=>{
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let userId;
//     let adminId;
//     let admintoken;
//     let usertoken;
//     beforeAll(async ()=>{
//          //runs before all the test runs only once
//          const username =    `kirat-${Math.random()}`
//          const password = '123456'
//         const Signupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//              username,
//              password,
//              type : 'admin'
//          }) ;
//          const response = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//              username,
//              password
//          })
//          adminId = Signupresponse.data.userId
//          admintoken = response.data.token

//          const userSignupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username:username + "-user",
//             password,
//             type : 'user'
//         }) ;
//         const userSigninresponse = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//             username : username + "-user",
//             password
//         })
//         userId = userSignupresponse.data.userId
//         usertoken = userSigninresponse.data.token
         
//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//                 "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//                 "width": 1,
//                 "height": 1,
//               "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
            
//         },{
//             headers: {
//                 Authorization:`Bearer ${admintoken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        
//     },{
//         headers: {
//             Authorization:`Bearer ${admintoken}`
//         }
//     })
//      element1Id = element1Response.id
//      element2Id = element2Response.id

//      const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,
//         {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                     elementId: "chair1",
//                     x: 20,
//                     y: 20
//                 }, {
//                   elementId: "chair2",
//                     x: 18,
//                     y: 20
//                 }, {
//                   elementId: "table1",
//                     x: 19,
//                     y: 20
//                 }, {
//                   elementId: "table2",
//                     x: 19,
//                     y: 20
//                 }
//             ]
         
//      },{
//         headers : {
//             Authorization:`Bearer ${admintoken}`
//         }
//      })
//     })

//     test('user is  able to create a space',async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name": "Test",
//           "dimensions": "100x200",
//           "mapId": mapId
//        },{
//         headers: {
//             authorization : `Bearer ${usertoken}`
//         }
            
//        })

//        expect(response.spaceId).toBeDefined()
//     }
//     )
//     test('user is  able to create a space without mapId',async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name": "Test",
//           "dimensions": "100x200"
//        },{
//         headers: {
//             authorization : `Bearer ${usertoken}`
//         }
            
//        })

//        expect(response.spaceId).toBeDefined()
//     }
//     )
//     test("can't create a space without mapID and dimensions",async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name": "Test",
         
//        },{
//         headers: {
//             authorization : `Bearer ${usertoken}`
//         }
            
//        })

//        expect(response.statusCode).toBe(400)
//     }
//     )
//     test("user can't delete a space that doesn't exist ",async()=>{
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/:spaceId`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
                
//            })

//        expect(response.statusCode).toBe(400)
//     }
//     )
//     test("user able to delete a space that does exist ",async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name": "Test",
//           "dimensions": "100x200"
//        },{
//         headers: {
//             authorization : `Bearer ${usertoken}`
//         }
            
//        })
//        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/:${response.data.spaceId}`,{
//         headers: {
//             authorization : `Bearer ${usertoken}`
//         }
            
//        })
//         expect(deleteResponse.statusCode).toBe(200)
//     }
//     )
//     test("Admin not able to delete users space",async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name": "Test",
//           "dimensions": "100x200"
//        },{
//         headers: {
//             authorization : `Bearer ${admintoken}`
//         }
            
//        })
//        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/:${response.data.spaceId}`,{
//         headers: {
//             authorization : `Bearer ${admintoken}`
//         }
            
//        })
//         expect(deleteResponse.statusCode).toBe(400)
//     }
//     )
//     test("Admin has no spaces initially",async ()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`,
//             {
//                 headers: {
//                     authorization : `Bearer ${admintoken}`
//                 }     
//             }  
               
//         )
//         expect(response.data.spaces.length).toBe(0)
//     })
//     test("creating a space by admin",async ()=>{
//         const SpaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space/`,
//             {
//                 headers: {
//                     authorization : `Bearer ${admintoken}`
//                 }     
//             }  
               
//         )
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`)
//         const filteredSpace = response.data.spaces.find(x => x.id == spaceId )
//         expect(response.data.spaces.length).toBe(1)
//         expect(filteredSpace).toBeDefined()
//     })
// })

// describe("Arena endpoints",()=>{
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let userId;
//     let adminId;
//     let admintoken;
//     let usertoken;
//     let spaceId;
//     beforeAll(async ()=>{
//          //runs before all the test runs only once
//          const username =    `kirat-${Math.random()}`
//          const password = '123456'
//         const Signupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//              username,
//              password,
//              type : 'admin'
//          }) ;
//          const response = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//              username,
//              password
//          })
//          adminId = Signupresponse.data.userId
//          admintoken = response.data.token

//          const userSignupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username:username + "-user",
//             password,
//             type : 'user'
//         }) ;
//         const userSigninresponse = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//             username : username + "-user",
//             password
//         })
//         userId = userSignupresponse.data.userId
//         usertoken = userSigninresponse.data.token
         
//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//                 "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//                 "width": 1,
//                 "height": 1,
//               "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
            
//         },{
//             headers: {
//                 Authorization:`Bearer ${admintoken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        
//     },{
//         headers: {
//             Authorization:`Bearer ${admintoken}`
//         }
//     })
//      element1Id = element1Response.id
//      element2Id = element2Response.id

//      const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,
//         {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                     elementId: "chair1",
//                     x: 20,
//                     y: 20
//                 }, {
//                   elementId: "chair2",
//                     x: 18,
//                     y: 20
//                 }, {
//                   elementId: "table1",
//                     x: 19,
//                     y: 20
//                 }, {
//                   elementId: "table2",
//                     x: 19,
//                     y: 20
//                 }
//             ]
         
//      },{
//         headers : {
//             Authorization:`Bearer ${admintoken}`
//         }
//      })
//     mapId = mapResponse.mapId
//      const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//         "name": "Test",
//       "dimensions": "100x200",
//       "mapId": "map1"
//    }      
//      ,{
//         headers:{
//             "authorization":`Bearer ${usertoken}`
//         }
//      })
//      spaceId = spaceCreateResponse.data.spaceId
//     })

//     test('Incorrect spaceId returns a 400',()=>{
//         const response = axios.get(`${BACKEND_URL}api/v1/space/123sod215`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
//         expect(response.statusCode).toBe(400)
//     })
//     test('correct spaceId returns a 200',()=>{
//         const response = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
//         expect(response.data.dimensions).toBe("100x200");
//         expect(response.data.elements.length).toBe(3);
//     })
//     test('Delete an element',async ()=>{
//         const response = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
//         await axios.delete(`${BACKEND_URL}api/v1/space/element`,{
//             spaceId :spaceId,
//             elementId : response.data.elements[0].id
//         },{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         })
//         const newResponse = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
       
//         expect(newResponse.data.elements.length).toBe(2);
//     })
//     test('Adding an element as expected',async ()=>{
//         const response = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
//         await axios.post(`${BACKEND_URL}api/v1/space/element`,{
            
//                 "elementId": element1Id,
//                 "spaceId": spaceId,
//                 "x": 50,
//                 "y": 20
              
//         },{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         })
//         const newResponse = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
       
//         expect(newResponse.data.elements.length).toBe(3);
//     })
//     test('Adding an element fails in the outside the dimensions',async ()=>{
//         const response = axios.get(`${BACKEND_URL}api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization : `Bearer ${usertoken}`
//             }
//         });
//         await axios.post(`${BACKEND_URL}api/v1/space/element`,{
            
//                 "elementId": element1Id,
//                 "spaceId": spaceId,
//                 "x": 50000,
//                 "y": 20000
              
//         })
       
       
//         expect(response.statusCode).toBe(400);
//     })
// })

// describe("Creator endpoints",()=>{
//     let userId;
//     let adminId;
//     let admintoken;
//     let usertoken;
//     let spaceId;
//     beforeAll(async ()=>{
//          //runs before all the test runs only once
//          const username =    `kirat-${Math.random()}`
//          const password = '123456'
//         const Signupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//              username,
//              password,
//              type : 'admin'
//          }) ;
//          const response = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//              username,
//              password
//          })
//          adminId = Signupresponse.data.userId
//          admintoken = response.data.token

//          const userSignupresponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username:username + "-user",
//             password,
//             type : 'user'
//         }) ;
//         const userSigninresponse = await axios.post(`${BACKEND_URL}/api/vi/signin`,{
//             username : username + "-user",
//             password
//         })
//         userId = userSignupresponse.data.userId
//         usertoken = userSigninresponse.data.token
//     })
//     test("User is not able to hit admin Endpoints",async ()=>{
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        
//     },{
//         headers: {
//             Authorization:`Bearer ${usertoken}`
//         }
//     })
//     const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,
//         {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
                     
//                 }
//             ]
         
//      },{
//         headers : {
//             Authorization:`Bearer ${usertoken}`
//         }
//      })
    

//      const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            
//         "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         "name": "Timmy"
    
// },{
//     headers : {
//         "authorization":   `Bearer ${usertoken}`
//     }
// })  

//    const updateElementResponse = axios.put(`${BACKEND_URL}/api/v1/admin/element/:elementId`,{
    
//         "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"	
    
//    },{
//     headers: {
//         authorization : `Bearer ${usertoken}`
//     }
//    })
//     expect(elementResponse.statusCode).toBe(403);
//      expect(mapResponse.statusCode).toBe(403);
//      expect(avatarResponse.statusCode).toBe(403);
//      expect(updateElementResponse).toBe(403)
//     } )
//     test("Admin is able to hit admin endpoints",async ()=>{
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        
//     },{
//         headers: {
//             Authorization:`Bearer ${admintoken}`
//         }
//     })
//     const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,
//         {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements":[{
//                 elementId: "chair1",
//                 x: 20,
//                 y: 20
//             }, {
//               elementId: "chair2",
//                 x: 18,
//                 y: 20
//             }, {
//               elementId: "table1",
//                 x: 19,
//                 y: 20
//             }, {
//               elementId: "table2",
//                 x: 19,
//                 y: 20
//             }
//         ]
         
//      },{
//         headers : {
//             Authorization:`Bearer ${admintoken}`
//         }
//      })
    

//      const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            
//         "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         "name": "Timmy"
    
// },{
//     headers : {
//         "authorization":   `Bearer ${admintoken}`
//     }
// })  

//    const updateElementResponse = axios.put(`${BACKEND_URL}/api/v1/admin/element/:elementId`,{
    
//         "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"	
    
//    },{
//     headers: {
//         authorization : `Bearer ${admintoken}`
//     }
//    })
//     expect(elementResponse.statusCode).toBe(200);
//      expect(mapResponse.statusCode).toBe(200);
//      expect(avatarResponse.statusCode).toBe(200);
//      expect(updateElementResponse).toBe(200)
//     } )
// })

// describe('Websocket tests',()=>{
//     let userToken;
//     let userId;
//     let admintoken;
//     let adminId;
//     let element1Id;
//     let element2Id;
//     let mapId;
//     let spaceId;
//     let ws1;
//     let ws2
//     let ws1_messages = []
//     let ws2_messages = []
//     let adminX;
//     let adminY;
//     let userX;
//     let userY;
   
//     async function waitForPopLatestMessages(messageArray) {
//         while (true) {
//             if (messageArray.length > 0) {
//                 return messageArray.shift(); // Return the popped message if available
//             }
            
//             // Wait for a short period before checking again
//             await new Promise(resolve => setTimeout(resolve, 100));
//         }
//     }
    
//     async function SetupHTTP(){        
//     const username = `surya-${Math.random()}`
//     const password = '123456'
//     const AdminSignupResponse = axios.post(`${BACKEND_URL}/api/v1/signup`,{
//         username,
//         password,
//         role:'admin'
//     }) 
//     const userSigninResponse = axios.post(`${BACKEND_URL}/api/v1/signin`,{
//         username,
//         password,
//     }) 
//     adminId = AdminSigninResponse.data.userId;
//     admintoken = AdminSigninResponse.data.token;

//     const userSignupResponse = axios.post(`${BACKEND_URL}/api/v1/signup`,{
//         username: username + "-user",
//         password,
//         role:'user'
//     }) 
//     const AdminSigninResponse = axios.post(`${BACKEND_URL}/api/v1/signin`,{
//         username: username + "-user",
//         password,
//     }) 
//     adminId = userSignupResponse.data.userId;
//     admintoken = userSigninResponse.data.token;

//     const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
                
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
            
//         },{
//             headers: {
//                 Authorization:`Bearer ${admintoken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//         "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        
//     },{
//         headers: {
//             Authorization:`Bearer ${admintoken}`
//         }
//     })
//     element1Id = element1Response.id
//     element2Id = element2Response.id

//     const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,
//         {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                     elementId: "chair1",
//                     x: 20,
//                     y: 20
//                 }, {
//                 elementId: "chair2",
//                     x: 18,
//                     y: 20
//                 }, {
//                 elementId: "table1",
//                     x: 19,
//                     y: 20
//                 }, {
//                 elementId: "table2",
//                     x: 19,
//                     y: 20
//                 }
//             ]
        
//     },{
//         headers : {
//             Authorization:`Bearer ${admintoken}`
//         }
//     })
//     mapId = mapResponse.mapId
//     const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//         "name": "Test",
//     "dimensions": "100x200",
//     "mapId": "map1"
//     }      
//     ,{
//         headers:{
//             "authorization":`Bearer ${admin}`
//         }
//     })
//     spaceId = spaceCreateResponse.data.spaceId
//     }
//     async function SetupWS(){        
//           ws1 = new WebSocket(WS_URL)
//           ws2 = new WebSocket(WS_URL)
//           await new Promise(r =>{
//             ws1.onopen = r
//           }) 

//           ws1.onmessage = (event) =>{
//             ws1_messages.push(JSON.parse(event.data))
//           }

//           await new Promise(r =>{
//             ws2.onopen = r
//           })
         
//           ws2.onmessage = (event) =>{
//             ws2_messages.push(JSON.parse(event.data))
//           }
//     }
//     beforeAll(async ()=>{
//       SetupHTTP()
//       SetupWS()
//     })

//     test('get back acknowledgement for joining the space ',async ()=>{
      

//           ws1.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": admintoken
//             }
//         }))
//         const message1 = await waitForPopLatestMessages(ws1_messages);
//         ws2.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": userToken
//             }
//         }))

        
//         const message2 = await waitForPopLatestMessages(ws2_messages);
//         const message3 = await waitForPopLatestMessages(ws1_messages);

//         expect(message1.type).toBe("space_joined")
//         expect(message2.type).toBe("space_joined")
//         expect(message1.payload.users.length ).toBe(0)
//         expect( message2.payload.users.length).toBe(1)
//         expect(message3.type).toBe("user-join")
//         expect(message3.payload.x).toBe(message2.payload.spawn.x)
//         expect(message3.payload.y).toBe(message2.payload.spawn.y)

        

//        adminX = message1.payload.spawn.x
//        adminY = message1.payload.spawn.y

//        userX = message2.payload.spawn.x
//        userY = message2.payload.spawn.y
//     })

//     test("User should not be able to move across the space",async ()=>{
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": 20000,
//                 "y": 399999
//             }
//         }))

//         const message = await waitForPopLatestMessages(ws1_messages)
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })
//     test("User should not be able to move two blocks at the same time",async ()=>{
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": adminX + 2,
//                 "y": adminY
//             }
//         }))

//         const message = await waitForPopLatestMessages(ws1_messages)
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })
//     test("User should not be able to move two blocks at the same time",async ()=>{
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": adminX + 1,
//                 "y": adminY,
//                 userId : adminId
//             }
//         }))

//         const message = await waitForPopLatestMessages(ws2_messages)
//         expect(message.type).toBe("movement")
//         expect(message.payload.x).toBe(adminX+1)
//         expect(message.payload.y).toBe(adminY)
//     })
//     test("Correct movement should be broadcasted to the other sockets in the room",async ()=>{
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": adminX + 1,
//                 "y": adminY,
//                 userId : adminId
//             }
//         }))

//         const message = await waitForPopLatestMessages(ws2_messages)
//         expect(message.type).toBe("movement")
//         expect(message.payload.x).toBe(adminX+1)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("if a user a leaves, the other user receives a message",async ()=>{
//         ws1.close()
//         const message = await waitForPopLatestMessages(ws2_messages);
//         expect(message.type).toBe('user-left')
//         expect(message.payload.userId).toBe(adminId)
//     })
// })