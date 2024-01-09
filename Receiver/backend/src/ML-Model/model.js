const { parentPort, isMainThread } = require("worker_threads");
const Decimal = require('decimal.js');
const { InferenceSession, Tensor } = require('onnxruntime-node');
// let acc = new Decimal("0.33");
let acc = 0.03
async function runInference(modelPath, inputData, inputShape) {
  // Load the ONNX model
  const session = await InferenceSession.create(modelPath);

  // Preprocess input data
  const inputTensor = new Tensor('float32', new Float32Array(inputData), inputShape);

  // Create the input feeds object using the correct model input name
  const inputName = 'float_input'; // Replace with the actual input tensor name of your model
  const feeds = { [inputName]: inputTensor };

  // Run inference
  const outputMap = await session.run(feeds);
  const labelTensor = outputMap['label'];
  const probabilitiesTensor = outputMap['probabilities'];

  // Post-process output data
  const label = labelTensor.data;
  const probabilities = probabilitiesTensor.data;
  return probabilities[0];
}

// module.exports = { runInference };
async function exampleUsage(data) {
  const modelPath = './src/ML-Model/onnx_model.onnx';
  const inputShape = [1, 9]; // Shape for a 1D tensor with 1 row and 9 columns
  // const inputData = Float32Array.from([0.10, 6.14, 15, 0.00, 1, 1.55, 7, 11, 21]);
  // 2.59,2.09,229.42,88.30,27.15,35,3389,7899.00,8009
  // let dataArray = Object.values(data);
  // console.log(dataArray)
  if(data.length ===9){

    // console.log("rabin sharma");
  let inputData = Float32Array.from(data);
    // console.log(inputData);
    acc = await runInference(modelPath, inputData, inputShape);
    // console.log("The accuracy is: ",acc);

    if (parentPort) {
      parentPort.postMessage({ accu: acc });
      // console.log("Inside the parentPort");
    }
  }
  // console.log("array length: ",data.length);
  // console.log("Type of data: ",typeof data);
  // console.log("Type of dataarray: ",typeof dataArray);

  }


  if (!isMainThread) {

    parentPort.on('message', (data) => {
      // console.log("String data ",data.row);
      let stringData = data.row;
      let dataArray = stringData.split(',');// storing the values with ',' as separator
      let numericArray = dataArray.map(value => parseFloat(value)); // converting the data to float
      // console.log("apple");
      exampleUsage(numericArray);
      // console.log(acc);
    }); 
  }




