// (function () {
//   	var array = new Array('a', 'b', 'c', 'd', 'e');
//   	array[10] = 'f';
//   	delete array[10];
//   	console.log(array.length);
// }());


// function geek() {
//     if(true) {
//       var a = 5;
//     }
//     console.log(a);
// }
// geek();

// let i;
// for (i = 0; i < 3; i++) {
//     const log = () => {
//         console.log(i);
//     };
//     setTimeout(log, 100);
// // }
// function mul(x) {
//     return function (y) {
//         return function (z) {
//             return function (w) {
//                 return function (p) {
//                     return x * y * z * w * p;
//                 };
//             };
//         };
//     };
// }
// console.log(mul(2)(3)(4)(5)(6));

var obj = {
    message: 'Hello',
    innerMessage: function () {
      (function () {
        console.log(this.message);
      }());
    }
  };
  console.log(obj.innerMessage());