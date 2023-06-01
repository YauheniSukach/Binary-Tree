export class TreeNode {
  constructor(
    public id: string,
    public value: number,
    public leftChild?: TreeNode | null,
    public rightChild?: TreeNode | null
  ) {}
}
