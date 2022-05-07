abstract class UseCase<T, S> {
    abstract execute(inputPort: T): Promise<S>
}

export default UseCase