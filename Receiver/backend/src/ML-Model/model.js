const { parentPort, isMainThread } = require("worker_threads");

const { InferenceSession, Tensor } = require('onnxruntime-node');
let acc = 90;
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

  // Print the outputs
  // console.log('Label:', label);
  // console.log('Probabilities:', probabilities[0]);
  return probabilities[0];
}

// module.exports = { runInference };
async function exampleUsage() {
  const modelPath = '/home/rabin-sharma/Documents/Github/Mini-Project/Receiver/backend/src/ML-Model/onnx_model.onnx';
  const inputShape = [1, 9]; // Shape for a 1D tensor with 1 row and 9 columns
  const inputData = Float32Array.from([0.10, 6.14, 15, 0.00, 1, 1.55, 7, 11, 21]);

  acc = await runInference(modelPath, inputData, inputShape);
  if (!isMainThread) {
    parentPort.setMaxListeners(20); // Set it to a value that accommodates your listeners
    parentPort.on('message', (data) => {
      console.log("This is an apple");
      exampleUsage(data);
      parentPort.postMessage(acc);
    });
  
  }

  // else{
  //   parentPort.postMessage(acc);
    
  // }
}


// Add an error handler to catch potential issues
// parentPort.on('error', (error) => {
//   console.error('Worker thread error:', error);
// });

// // Log a message when the worker thread is initialized
// console.log('Worker thread initialized');


// let val = 5;
// parentPort.postMessage(acc);
// console.log(acc);

// parentPort.postMessage(acc);


// *************The function below is used to find the input and output labels of the .onnx model ****************
// const { InferenceSession } = require('onnxruntime-node');

// async function getInOutNames(modelPath) {
//     const session = await InferenceSession.create(modelPath);
//     const inputNames = session.inputNames;
//     const outputNames = session.outputNames;
  
//     return { inputNames, outputNames };
//   }
  
//   getInOutNames(modelPath)
//     .then(({ inputNames, outputNames }) => {
//       console.log('Input Names:', inputNames);
//       console.log('Output Names:', outputNames);
//     })
//     .catch(error => console.error('Error:', error));


