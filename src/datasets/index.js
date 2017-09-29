// Standard imports
import request from 'request';
import csv from 'csv';

// Local imports
import { LinAlg } from '../math';

/**
 * Load a dataset (features and target) from some CSV input string. Extracts the data from the CSV
 * and uses all but the last column as the features and the last column as the target. This function
 * is asynchronous, and needs a user callback for when the file is successfully parsed
 *
 * @param string input Input CSV string
 * @param callable callback Callback function with arguments X (features) and y (targets)
 */
function loadDatasetFromCSV(input, callback) {
  csv.parse(input, { auto_parse: true }, (err, output) => {
    // Extract the feature and target columns
    const X = LinAlg.slice(output, [0, 0], [null, -1]);
    const y = LinAlg.slice(output, [0, -1], [null, null]);

    // Call user-provided callback
    callback(X, y);
  });
}

/**
 * Load a dataset from a remote CSV file. Fetches the CSV file and calls loadDatasetFromCSV. This
 * function is asynchronous, and needs a user callback for when the remote CSV file is successfully
 * loaded and parsed
 *
 * @param string input Input CSV file URL
 * @param callable callback Callback function with arguments X (features) and y (targets)
 */
function loadDatasetFromRemoteCSV(url, callback) {
  request.get(url, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      throw new Error('Unable to load remote dataset file.');
    }

    loadDatasetFromCSV(body, callback);
  });
}

/**
 * Load the iris dataset. This is an asynchronous function: when the Iris dataset is loaded, a
 * user-specified callback function is invoked, with the data set features array and the targets
 * array as the first and second parameter, respectively
 *
 * For more information, see https://github.com/jsmlt/datasets/tree/master/iris
 *
 * @param callable callback Callback function with arguments X (features) and y (targets). Called
 *   when the dataset is successfully loaded
 */
function loadIris(callback) {
  loadDatasetFromRemoteCSV('https://raw.githubusercontent.com/jsmlt/datasets/master/iris/data.csv', callback);
}

export default {
  loadIris,
};
