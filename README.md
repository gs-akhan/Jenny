# Jenny
A very simple Scheme-like interpreted language. 👨🏻‍💻


# About
A lot about jenny is inspired buy scheme. currently scheme executes on Javascript VM, i.e it uses Nodejs to run.


### Language Features - 

* [Data Types](#Data-types)
* [Declarations & Updating Identifiers](#declarations-&-updating-identifiers)
* [Code Comments](#code-comments)
* [Arthmatic Operators](#arthmatic-operators)
* [Funtions](#functions)
* [Block Scope](#block-scope)
* [Lambda Functions](#lambda-functions)
* [Control Flow Statements](#control-flow-statements)
    >* [if statement](#if-statement)
    >* [switch statement](#switch-statement)
* Iteration Controls
    >* [while loop](#while-loop)
    >* [For Loop](#for-loop)
* [Recurssion](#recurssion)


### Data Types
Language currently supports three primitive data types.
1. Number 
2. String 
3. Boolean

#### Declaring and initializing data 

Every statement in the language is an expression. every time you declare something explicitly returns the value. 

Declaration : 
```
(var name "Jordan") //Declaring name ans setting to "Jordan"
(var age 25) 

/* Updating indentifier */

(set name "King")
(set age 30)

```

### Code Comments

Use  `/* code comment */ ` For both single line and multi line comments. 


### Arthmatic Operators

The language supports left associativity. So the operator is on the left and operands are space separated. 

```
/* addition */

(+ 10 10)   /* Outputs 20 */
(* 10 10)   /* Outputs 100 */
(/ 10 10)   /* Outputs 1 */

```


Nested Operations :
/* nested */

```
var sum (+ 1 (+ 10 10))

print sum // outputs 21

```

### Functions 
Function declarations are done using `func` keyword. 

```
(begin
    func addNumbers (a b) (
        (+ a b)
    )

    (addNumbers 1 1)
)
```

### Lambda Functions
Lambda functions are used pass functions as callbacks. 
`lambda` keyword is used to declare the lambda function . 

```
(begin 
    (func onClick (callback)
        (begin 
            (var x 10)
            (var y 20)
            (callback (+ x y)) 
        )
    )
    (onClick (lambda (data) (* data 10)))
)

```


### Block Scope
`begin` keyword is used to define a block and all variable declarations are scoped to block. 
Inner blocks have access to outer blocks. 

```
(begin
    (var name "Jordan") 

    (begin

        (var newName "Jim")
        /* Scoped only to the current block */

        (print name)
        (print newName)
    )
)

```

### Control Flow Statements
If statement 

```
(begin 
    (var age 18)

    (if (< age 18) 
        ("Under 18") /* if the condition is met this block is executed */
        ("Adult") /*  this is the else part*/
    )

)

```

Switch Case Statement

```
/* Begin statement */
(begin 
    (var x 100)

    (switch 
        ((= x 100) 1)
        ((= x 200) 2)
        (else 500)
    )
)
```

### Iteration Controls

While statement
```
(begin
    (var result 0) 
    (while (< result 10)
        (set result (+ result 1))
    )
)

```

### For Loop
`(<for keyword> (<initialization block>) (<bail out condition>)  (<increment block>) (<block>))`
```
(begin
    (var result 1)
    (for (var x 1) (< x 10) (set x (+ x 1))
        (begin 
            (set result (+ result x))
        )
    )
)

```

### Recurssion

```
(begin 
    (func factorial (input)
        (if (= input 1)
            1
            (* input (factorial (- input 1)))
        )
    )   
    (factorial 5)
)
```


Special thanks to [Srinivas Pulagam](#https://github.com/gs-spulagam) for all the mentoring and help.