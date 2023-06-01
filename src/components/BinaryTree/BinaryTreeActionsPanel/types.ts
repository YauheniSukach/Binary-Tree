import { TreeNode } from '../../../common/types';

export interface BinaryTreeActionsPanelProps {
  selectedNodeId: string | null;
  setSearchResultNodeId: (node: string | null) => void;
  setSelectedNodeId: (node: string | null) => void;
  setTree: (tree: TreeNode) => void;
  tree: TreeNode | null;
}
