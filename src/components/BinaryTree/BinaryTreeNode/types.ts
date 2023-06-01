import { TreeNode } from '../../../common/types';

export interface BinaryTreeNodeProps {
  isRootNode?: boolean;
  leftChild?: TreeNode | null;
  nodeId: string;
  rightChild?: TreeNode | null;
  searchResultNodeId: string | null;
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string) => void;
  value: number;
}
