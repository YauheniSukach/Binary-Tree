import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import { BinaryTreeNode } from './BinaryTreeNode';
import { BinaryTreeActionsPanel } from './BinaryTreeActionsPanel';

import { TreeNode } from '../../common/types';
import { JSON_SERVER_ADRESS } from '../../common/constants';

import styles from './BinaryTree.module.scss';

const { binaryTree, binaryTreeContainer, loaderContainer } = styles;

export const BinaryTree = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchResultNodeId, setSearchResultNodeId] = useState<string | null>(
    null
  );

  const [tree, setTree] = useState<TreeNode>({} as TreeNode);
  const [isTreeLoading, setIsTreeLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMockTree = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_ADRESS}/tree`, {
          method: 'GET',
        });
        const tree: TreeNode = await response.json();

        setTree(tree);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsTreeLoading(false);
      }
    };

    getMockTree();
  }, []);

  const { id: nodeId, leftChild, rightChild, value: rootNodeValue } = tree;

  return (
    <Box className={binaryTreeContainer}>
      <Typography fontSize="40px" color="black">
        Binary Tree
      </Typography>
      <Box className={binaryTree}>
        <BinaryTreeActionsPanel
          selectedNodeId={selectedNodeId}
          setSearchResultNodeId={setSearchResultNodeId}
          setSelectedNodeId={setSelectedNodeId}
          setTree={setTree}
          tree={tree}
        />
        {!isTreeLoading && tree !== null ? (
          <BinaryTreeNode
            isRootNode
            leftChild={leftChild}
            nodeId={nodeId}
            rightChild={rightChild}
            searchResultNodeId={searchResultNodeId}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            value={rootNodeValue}
          />
        ) : (
          <Box className={loaderContainer}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};
