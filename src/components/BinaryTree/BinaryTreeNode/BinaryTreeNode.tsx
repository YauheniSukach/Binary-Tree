import { FC, memo } from 'react';
import { Box, Button } from '@mui/material';
import classNames from 'classnames';

import { BinaryTreeNodeProps } from './types';

import styles from './BinaryTreeNode.module.scss';

const {
  binaryTreeLine,
  binaryTreeNode,
  binaryTreeNodeContainer,
  binaryTreeNodeKnees,
  binaryTreeNodeRoot,
  binaryTreeNodeSelected,
  binaryTreeNodeFound,
} = styles;

export const BinaryTreeNode: FC<BinaryTreeNodeProps> = memo((props) => {
  const {
    isRootNode,
    leftChild,
    nodeId,
    setSelectedNodeId,
    rightChild,
    searchResultNodeId,
    selectedNodeId,
    value,
  } = props;

  const isNodeSelected = selectedNodeId ? selectedNodeId === nodeId : false;
  const isNodeFound = searchResultNodeId
    ? searchResultNodeId === nodeId
    : false;

  return (
    <Box className={binaryTreeNodeContainer}>
      <Button
        key={nodeId}
        onClick={() => setSelectedNodeId(nodeId)}
        className={classNames(binaryTreeNode, {
          [binaryTreeNodeRoot]: isRootNode,
          [binaryTreeNodeSelected]: isNodeSelected,
          [binaryTreeNodeFound]: isNodeFound,
        })}
      >
        {value}
      </Button>
      <Box className={binaryTreeLine}></Box>
      <Box className={binaryTreeNodeKnees}>
        {leftChild && (
          <BinaryTreeNode
            leftChild={leftChild.leftChild}
            nodeId={leftChild.id}
            rightChild={leftChild.rightChild}
            searchResultNodeId={searchResultNodeId}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            value={leftChild.value}
          />
        )}
        {rightChild && (
          <BinaryTreeNode
            leftChild={rightChild.leftChild}
            nodeId={rightChild.id}
            rightChild={rightChild.rightChild}
            searchResultNodeId={searchResultNodeId}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            value={rightChild.value}
          />
        )}
      </Box>
    </Box>
  );
});
