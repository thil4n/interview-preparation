# Common Coding Problems - Patterns and Solutions

## Array Problems

### 1. Two Sum Problem

Find two numbers that add up to a target sum.

```java
// Problem: [2, 7, 11, 15], target = 9
// Output: [0, 1] (indices of 2 and 7)

// Solution 1: HashMap (O(n) time, O(n) space)
int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}

// Solution 2: Two pointers (works if sorted)
int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[] { left, right };
        else if (sum < target) left++;
        else right--;
    }
    return new int[] {};
}
```

### 2. Rotate Array

Rotate array to the right by k steps.

```java
// Problem: [1, 2, 3, 4, 5], k = 2
// Output: [4, 5, 1, 2, 3]

// Solution: Reverse (O(n) time, O(1) space)
void rotate(int[] nums, int k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length - 1);      // [5, 4, 3, 2, 1]
    reverse(nums, 0, k - 1);                // [4, 5, 3, 2, 1]
    reverse(nums, k, nums.length - 1);      // [4, 5, 1, 2, 3]
}

void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}
```

### 3. Maximum Subarray (Kadane's Algorithm)

Find contiguous subarray with largest sum.

```java
// Problem: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6 (subarray [4, -1, 2, 1])

int maxSubArray(int[] nums) {
    int maxCurrent = nums[0];
    int maxGlobal = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return maxGlobal;
}

// Time: O(n), Space: O(1)
```

## String Problems

### 1. Longest Substring Without Repeating Characters

```java
// Problem: "abcabcbb"
// Output: 3 (substring "abc")

int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> charIndex = new HashMap<>();
    int maxLength = 0;
    int left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        if (charIndex.containsKey(s.charAt(right))) {
            left = Math.max(left, charIndex.get(s.charAt(right)) + 1);
        }
        charIndex.put(s.charAt(right), right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Time: O(n), Space: O(min(n, m)) where m = charset size
```

### 2. Reverse String

```java
// Problem: "hello"
// Output: "olleh"

String reverseString(String s) {
    char[] chars = s.toCharArray();
    int left = 0, right = chars.length - 1;
    
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    
    return new String(chars);
}

// Or simpler: return new StringBuilder(s).reverse().toString();
```

### 3. Check Palindrome

```java
boolean isPalindrome(String s) {
    String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int left = 0, right = clean.length() - 1;
    
    while (left < right) {
        if (clean.charAt(left) != clean.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Time: O(n), Space: O(n)
```

## Linked List Problems

### 1. Reverse Linked List

```java
class ListNode {
    int val;
    ListNode next;
}

// Iterative approach
ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode nextTemp = current.next;  // Save next node
        current.next = prev;                // Reverse the link
        prev = current;                     // Move prev
        current = nextTemp;                 // Move current
    }
    
    return prev;  // New head
}

// Time: O(n), Space: O(1)
```

### 2. Detect Cycle in Linked List

```java
// Floyd's Cycle Detection (Tortoise and Hare)
boolean hasCycle(ListNode head) {
    if (head == null) return false;
    
    ListNode slow = head;
    ListNode fast = head.next;
    
    while (slow != fast) {
        if (fast == null || fast.next == null) {
            return false;  // No cycle
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return true;  // Cycle detected
}

// Time: O(n), Space: O(1)
```

### 3. Find Middle of Linked List

```java
ListNode findMiddle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;  // Middle node
}

// Time: O(n), Space: O(1)
```

## Tree Problems

### 1. Binary Tree Traversal

```java
class TreeNode {
    int val;
    TreeNode left, right;
}

// Inorder (Left → Root → Right)
void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}

// Preorder (Root → Left → Right)
void preorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    result.add(root.val);
    preorder(root.left, result);
    preorder(root.right, result);
}

// Postorder (Left → Right → Root)
void postorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    postorder(root.left, result);
    postorder(root.right, result);
    result.add(root.val);
}

// Level Order (BFS)
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        
        result.add(level);
    }
    
    return result;
}
```

### 2. Maximum Path Sum

```java
int maxPathSum(TreeNode root) {
    int[] max = {Integer.MIN_VALUE};
    maxPathSumHelper(root, max);
    return max[0];
}

int maxPathSumHelper(TreeNode root, int[] max) {
    if (root == null) return 0;
    
    int leftSum = Math.max(0, maxPathSumHelper(root.left, max));
    int rightSum = Math.max(0, maxPathSumHelper(root.right, max));
    
    int pathThroughRoot = root.val + leftSum + rightSum;
    max[0] = Math.max(max[0], pathThroughRoot);
    
    return root.val + Math.max(leftSum, rightSum);
}

// Time: O(n), Space: O(h) where h is height
```

## Dynamic Programming Problems

### 1. Fibonacci Number

```java
// DP approach
int fib(int n) {
    if (n <= 1) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space-optimized
int fib(int n) {
    if (n <= 1) return n;
    
    int prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        int temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    
    return curr;
}

// Time: O(n), Space: O(1)
```

### 2. Climbing Stairs

```java
// Problem: Climb n stairs, can go 1 or 2 steps at a time
// How many ways to reach the top?

int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev = 1, curr = 2;
    for (int i = 3; i <= n; i++) {
        int temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    
    return curr;
}

// Time: O(n), Space: O(1)
```

### 3. Longest Common Subsequence

```java
int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Time: O(m*n), Space: O(m*n)
```

## Graph Problems

### 1. Depth-First Search (DFS)

```java
void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}
```

### 2. Breadth-First Search (BFS)

```java
void bfs(int start, List<List<Integer>> graph) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[graph.size()];
    
    queue.add(start);
    visited[start] = true;
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.add(neighbor);
            }
        }
    }
}
```

## Common Patterns

- **Two Pointers**: Sorted array, linked list operations
- **Sliding Window**: Substring/subarray problems
- **HashMap/HashSet**: Frequency counting, finding duplicates
- **Heap/Priority Queue**: Top k elements, k-way merge
- **DFS/BFS**: Tree/graph traversal
- **Dynamic Programming**: Optimal substructure problems
- **Binary Search**: Sorted array search
