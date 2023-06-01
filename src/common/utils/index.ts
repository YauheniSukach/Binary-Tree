export class Queue<T> {
  private queueArray: T[] = [];

  public enqueue(value: T) {
    this.queueArray.push(value);
  }

  public dequeue() {
    return this.queueArray.shift();
  }

  public isEmpty() {
    return this.queueArray.length == 0;
  }
}

export const deepCopyObject = <T>(object: T) => {
  const copiedObject = JSON.parse(JSON.stringify(object));

  return copiedObject;
};
