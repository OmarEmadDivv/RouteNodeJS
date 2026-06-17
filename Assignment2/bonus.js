/**
 * Leetcode: 1539. Kth Missing Positive Number
 * 
 * Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
 * Return the kth positive integer that is missing from this array.
 * 
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
    let left = 0, right = arr.length - 1;

    // Binary search logic
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // The number of missing integers up to index `mid` is `arr[mid] - (mid + 1)`.
        let missing = arr[mid] - (mid + 1);

        if (missing < k) {
            left = mid + 1; // missing is less than k, look to the right
        } else {
            right = mid - 1; // missing is >= k, look to the left
        }
    }

    // At the end, `left` will be the number of elements in the array that are less than the missing kth element.
    // So the kth missing positive integer is `k + left`.
    return left + k;
};

// Test example:
// console.log(findKthPositive([2,3,4,7,11], 5)); // Output: 9
// console.log(findKthPositive([1,2,3,4], 2)); // Output: 6
