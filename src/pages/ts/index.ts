// let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]
console.log(list, 'list>>')

// 数字枚举枚举
enum Direction {
  NORTH = 3, // 可以设置初始值， 其余成员同样依次递增(数字枚举)
  SOUTH,
  EAST,
  WEST
}
// 数字枚举默认初始值为0，其余成员从1开始递增(数字枚举)
let dir0: Direction = Direction.NORTH
let dir1: Direction = Direction.SOUTH
console.log(dir0, dir1, 'dir>>>')

// 字符串枚举
enum strEnum {
  NORTH = 'NORTH',
  // SOUTH = 'SOUTH',
  // EAST = 'EAST',
  // WEST = 'WEST'
  SOUTH = 0,
  EAST = 13,
  WEST = 3
}
let stre1: strEnum = strEnum.NORTH
let stre2: strEnum = strEnum.SOUTH
console.log(stre1, stre2, typeof stre2, 'stre1>>>')

// 常量枚举
const enum Direction1 {
  NORTH = 'NORTH',
  SOUTH = 0,
  EAST = 1,
  WEST = 2
}
let dir_1: Direction1 = Direction1.NORTH
console.log(dir_1, 'dir_1>>')

/*
* 异构枚举
* 异构枚举的成员值是数字和字符串的混合
*/
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E = 8,
  F
}
// 反向映射
console.log(Enum.F, Enum[9]) // 9 F
/*
* 上述代码编译为es5 如下
*  var Enum
  (function(Enum) {
    Enum[Enum['A'] = 0] = 'A'
    Enum[Enum['B'] = 1] = 'B'
    Enum['C'] = 'C'
    Enum['D'] = 'D'
    Enum[Enum['E'] = 8] = 'E'
    Enum[Enum['F'] = 9] = 'F' 递增
  })(Enum || (Enum = {}))
*/

// 元组
let tupleType: [string, boolean]
tupleType = ['smile', true]

/*
* Void 类型
* 某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void
* 声明一个void类型的变量没有什么作用， 因为在严格模式下，它的值只能是undefined
*/
function warnUser(): void {
  console.log('this is my warning message')
}

/*
* never 类型
* never 类型表示的是哪些永不存在的类型
*/
function error(message: string): never {
  throw new Error(message)
}

// 可以利用never类型来实现全面性检查
type Foo = string | number
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {

  } else if (typeof foo === 'number') {

  } else {
    const check: never = foo
  }
}

// 对象类型 - 接口
interface Person {
  name: string;
  age: number;
  sex?: string; // 可选属性
  [propName: string]: number | string; // 允许有任意属性, 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它类型的样子，一个接口只能定义一个任意属性
  readonly id: number; // 只读属性
}

let tom: Person = {
  name: 'Tome',
  age: 25,
  other: 176,
  id: 3
}

// 用接口表示数组
interface NumberArray {
  [index: number]: number; // 可索引的类型
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5]

// 函数 类数组
function sum(x: number, y: number): number {
  // let args: number[] = arguments
  // 类数组
  let args: {
    [index: number]: number; // 可索引的类型
    length: number;
    callee: Function;
  } = arguments
  return x + y
}

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number} {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

// typescript具有ReadonlyArray<T>类型,它与Array<T>相似，只是把所有可变方法去掉，可以确保数组创建后不能被修改
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
// ro[2] = 6 // error 类型“readonly number[]”中的索引签名仅允许读取
// ro.push(0) // error 类型“readonly number[]”上不存在属性“push”
// console.log(ro.length)
// ro.length = 100 // error 无法分配到 "length" ，因为它是只读属性
// a = ro // error 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"

// 可以使用类型断言重写
// a = ro as number[]

interface ConfigOptions {
  color?: string;
  width?: number;
  [propName: string]: any
}

function createOption(config: ConfigOptions): { color: string, area: number } {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

// createOption({ color: 'red', width: 100, height: 100 } as ConfigOptions) // 使用断言绕开‘目标类型’不包含的属性报错
// createOption({ color: 'red', width: 100, height: 100 })

// 使用接口表示函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc
// 函数的参数名不需要与接口也里面定义的名字相匹配
mySearch = function (src: string, subString: string) {
  let result = src.search(subString)
  return result > -1
}

class Animal {
  name: string
}

class Dog extends Animal {
  breed: string
}

// 数字索引的返回值必须是字符串索引返回值类型的子类型
// interface Notokay {
//   [x: number]: Animal; // error 数字索引类型“Animal”不能赋给字符串索引类型“Dog”
//   [x: string]: Dog;
// }

// interface NumberDictionary {
//   [index: string]: number;
//   length: number;
//   name: string // error 类型“string”的属性“name”不能赋给字符串索引类型“number”
// }

// 类 类型
interface ClockInterface {
  currentTime: Date;
  // 可以再接口中描述一个方法， 在类里面实现它
  setTime(d: Date);

}

class Clock implements ClockInterface {
  currentTime: Date;
  // 在类里面实现接口中描述的setTime方法
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {

  }
}
