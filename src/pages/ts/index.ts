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
// interface ClockInterface {
//   currentTime: Date;
//   // 可以再接口中描述一个方法， 在类里面实现它
//   setTime(d: Date);

// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   // 在类里面实现接口中描述的setTime方法
//   setTime(d: Date) {
//     this.currentTime = d
//   }
//   constructor(h: number, m: number) {

//   }
// }

// interface ClockConstructor {
//   new (houer: number, minute: number)
// }

// class Clock1 implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number)
// }

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}

interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick')
  }
}

let digital = createClock(DigitalClock, 12, 17)

// 继承接口
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
// 一个接口可以继承多个接口
interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10
square.penWidth = 10

interface Counter {
  (satrt: number): string;
  interval: number;
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (statr: number) {}
  counter.interval = 23
  counter.reset = function () {}
  return counter
}

// 接口继承类（暂时没明白）


// 类
class Animal {
  private name: string
  protected color: string
  constructor(name: string) {
    this.name = name
  }
  // move() {
  //   console.log('animal move')
  // }
  // public say() {
  //   console.log('汪汪...')
  // }
}

class Dog extends Animal {
  constructor(name: string, kind: string, color: string) {
    super(color)
    // 在构造函数里面访问this属性之前，一定要调用super()
    this.kind = kind
    this.color = color
  }
  kind: string
  breed: string
  private age: number // private定义私有属性， 属性“age”为私有属性，只能在类“Dog”中访问
  move() {
    console.log('dog move')
  }
  say() {
    return `color is ${this.color}`
  }
}

class Rhino extends Animal {
  constructor() { super('Rhino') }
}
let passcode = 'secret passcode1'
class Employee {
  private name: string
  private _fullName: string
  constructor(name: string) {
    this.name = name
  }
  get fullName(): string {
    return this._fullName
  }
  set fullName(newName: string) {
    if (passcode && passcode === 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}
let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')
animal = rhino
// animal = employee // error 不能将类型“Employee”分配给类型“Animal”。类型具有私有属性“name”的单独声明。

let dog = new Dog('jack', 'dog', 'black')
// console.log(dog.color) // 属性“color”受保护，只能在类“Animal”及其子类中访问
console.log(dog.say())
// console.log(dog.age) // 属性“age”为私有属性，只能在类“Dog”中访问
employee.fullName = 'Bob Smith'
console.log(employee)
if (employee.fullName) {
  console.log(employee.fullName)
}

// 静态属性
class Grid {
  static origin = { x: 0, y: 0 } // 使用static定义静态属性，这个属性存在类本身上而不是类的实例上
  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    let xDist = (point.x - Grid.origin.x)
    let yDist = (point.y - Grid.origin.y)
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }

  constructor (public scale: number) {}
}

// 抽象类
// abstract 关键字是用于定义抽象类合在抽象类内部定义抽象方法
abstract class Department {
  constructor(public name: string) {
    
  }
  printName(): void {
    console.log('department name:' + this.name)
  }

  abstract printMeeting(): void // 必须再子类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // 在子类的构造函数中必须吊桶super()
  }

  printMeeting(): void {
    console.log('this accounting department meets each monday at 10am')
  }

  generateReports(): void {
    console.log('generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
// department = new Department() // error 不能创建一个抽象类的实例
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
// department.generateReports() // error 方法在声明的抽象类中不存在


// 类 ---- 高级技巧
// class Greeter {
//   greeting: string
//   constructor(message: string) {
//     this.greeting = message
//   }
//   greet() {
//     return 'hello ' + this.greeting
//   }
// }
// let greeter: Greeter
// greeter = new Greeter('word')

// 上面代码被编译成js
// let Greeter = (function () {
//   function Greeter(message) {
//     this.greeting = message
//   }
//   Greeter.prototype.greet = function() {
//     return 'Hello' + this.greeting
//   }
//   return Greeter
// })()
// let greeter
// greeter = new Greeter('world')

class Greeter {
  static standardGreeting = 'hello, there'
  greeting: string
  greet() {
    if (this.greeting) {
      return 'hello ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter1: Greeter
greeter1 = new Greeter()
console.log(greeter1.greet())

let greeterMaker: typeof Greeter = Greeter // typeof Greeter 意思是取Greeter类的类型而不是实例的类型，或者更确切的说，"告诉我 Greeter 标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数
greeterMaker.standardGreeting = 'hey there'
let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

// 把类当作接口使用
class Point {
  x: number;
  y: number
}
 interface Point3d extends Point {
   z: number
 }
 let point3d: Point3d = { x: 1, y: 2, z: 3 }

 // 函数
//  let myAdd = function(x: number, y: number): number { return x + y }
let myAdd: (basValue: number, increment: number) => number =
function(x: number, y: number): number { return x + y }

// 函数剩余参数
function buildNmae(firstName: string, ...resetOfName: string[]) {
  console.log(resetOfName)
  return firstName + ' ' + resetOfName.join(' ')
}
let employeeName = buildNmae("Joseph", "Samuel", "Lucas", "MacKinzie")
console.log(employeeName)


// 泛型
// 给indentity添加了类型变量T, 可以使用T当作返回值类型，现在可以知道参数类型与返回值类型是相同的
// indentity 泛型函数
// function indentity<T>(arg: T): T {
//   // console.log(arg.length) // error 类型“T”上不存在属性“length”
//   return arg
// }

// 使用泛型的第一种方式  传入所有的参数，包含类型参数，指定了T是string类型
// let output = indentity<string>('myString')

// 第二种方式 利用类型推论
// let output1 = indentity('myString')

function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

// 
let myIdentity: <U>(arg: U[]) => U[] = identity

// 还可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity1: { <T>(arg: T[]): T[] } = identity

// 泛型接口
// interface GenericIdentityFn {
//   <T>(arg: T): T
// }

// function indentity1<T> (arg: T): T {
//   return arg
// }

// let myIdentity2: GenericIdentityFn = indentity1

// 把非泛型函数签名作为泛型类型一部分
interface GenericIdentityFn<T> {
  (arg: T): T
}
function identity1<T>(arg: T): T {
  return arg
}
let myIdentity2: GenericIdentityFn<string> = identity1

// 泛型类  泛型类看上去和泛型接口差不多 泛型类使用(<>)括起泛型类型，跟在类名后面
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T
}
let myGeneriNumber = new GenericNumber<number>()
myGeneriNumber.zeroValue = Number('1')
myGeneriNumber.add = function(x, y) {
  return x + y
}
console.log(myGeneriNumber.add(1, 2))

let stringNumberic = new GenericNumber<string>()
stringNumberic.zeroValue = String(12)

