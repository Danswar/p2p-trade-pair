abstract class UseCase<T, S> {
    abstract execute(inputPort: T): S
}

export default UseCase