const express = require('express')
const app = express()
const port = 3001

const bodyParser = require("body-parser");
var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

//Static data as no database fornow
const lineItems = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey"
  },
  {
    id: 2,
    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue"


  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White"
  },
];

const Dates = [
  { postal: 'V',
    ids: [2],
    DeleviryDates : "Nov 24, 2021"
  },
  { postal: 'V',
    ids: [1,3],
    DeleviryDates : "Nov 19, 2021"
  },
  { postal: 'M',
    ids: [2,3],
    DeleviryDates : "Nov 22, 2021"
  },
  { postal: 'M',
    ids: [1],
    DeleviryDates : "Dec 19, 2021"
  },
  { postal: 'K',
    ids: [1,2,3],
    DeleviryDates : "Dec 24, 2021"
  }

]



app.get('/getAppData', (req, res) => {
  try {
    res.json(lineItems);
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
})

app.post('/giveDeleveryData', (req, res) => {
  let resultArray ={}
  try {
    const array =Object.keys(req.body)
    const postalcodeLetter = array[0][0].toUpperCase()
    for (let i = 0; i < Dates.length; i++){
      if(postalcodeLetter === Dates[i]['postal']){
        for (let j = 0; j < Dates[i]['ids'].length; j++){
          resultArray[Dates[i]['ids'][j]] = Dates[i]['DeleviryDates']
        }
      }
    }
    res.json(resultArray)
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})