class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(input) {
    let node = this.root;

    for (let i = 0; i < input.length; i++) {
      if (!node.children[input[i]]) {
        node.children[input[i]] = new TrieNode(input[i]);
        node.children[input[i]].parent = node;
      }

      node = node.children[input[i]];

      if (i === input.length - 1) {
        node.end = true;
      }
    }
  }

  find(input) {
    let node = this.root;
    let output = [];

    for (let i = 0; i < input.length; i++) {
      if (!node.children[input[i]]) {
        return output;
      } else {
        node = node.children[input[i]];
      }
    }

    findAllWords(node, output);

    return output;
  }
}

class TrieNode {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  getWord() {
    let node = this;
    let output = [];

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join('');
  }
}

const findAllWords = (node, arr) => {
  if (node.end) {
    return arr.unshift(node.getWord())
  }

  for (let child in node.children) {
    findAllWords(node.children[child], arr);
  }
}

let trie = new Trie();

// insert few values
trie.insert("hello");
trie.insert("helium");

// check find method
console.log('first', trie.find("hel"));  // [ 'helium', 'hello' ]
console.log('second', trie.find("hell")); // [ 'hello' ]

