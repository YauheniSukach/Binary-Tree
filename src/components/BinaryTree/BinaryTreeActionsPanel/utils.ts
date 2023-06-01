import { TreeNode } from '../../../common/types';
import { Queue } from '../../../common/utils';

export const traverseBFS = (root: TreeNode, value: number) => {
  const nodeQueue = new Queue<TreeNode>();

  nodeQueue.enqueue(root);

  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue();

    if (!currentNode) {
      return null;
    }

    if (currentNode.value === value) return currentNode;

    if (currentNode.leftChild) nodeQueue.enqueue(currentNode.leftChild);
    if (currentNode.rightChild) nodeQueue.enqueue(currentNode.rightChild);
  }

  return null;
};

export const deleteNode = (
  selectedNodeId: string | null,
  currentNode?: TreeNode | null
) => {
  if (!currentNode || !selectedNodeId) {
    return;
  }

  if (currentNode.id === selectedNodeId) {
    throw new Error(
      'Seems like you want to delete root node. Sorry, but this action is forbidden'
    );
  }

  if (currentNode.leftChild && currentNode.leftChild.id === selectedNodeId) {
    currentNode.leftChild = null;

    return;
  }

  if (currentNode.rightChild && currentNode.rightChild.id === selectedNodeId) {
    currentNode.rightChild = null;

    return;
  }

  deleteNode(selectedNodeId, currentNode.leftChild);
  deleteNode(selectedNodeId, currentNode.rightChild);
};

export const addNode = (
  newNode: TreeNode,
  selectedNodeId: string | null,
  currentNode?: TreeNode | null
) => {
  if (!currentNode || !selectedNodeId) {
    return;
  }

  if (currentNode.id === selectedNodeId) {
    const { leftChild, rightChild, value: currentNodeValue } = currentNode;
    const { value: newNodeValue } = newNode;

    if (!leftChild && newNodeValue < currentNodeValue) {
      currentNode.leftChild = newNode;
    } else if (!rightChild && newNodeValue > currentNodeValue) {
      currentNode.rightChild = newNode;
    } else {
      throw new Error('Value is not correct or this node already has childs');
    }
  }

  addNode(newNode, selectedNodeId, currentNode.leftChild);
  addNode(newNode, selectedNodeId, currentNode.rightChild);
};
