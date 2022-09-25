import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Blog", function () {
  it("Should create a post", async function() {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();
    await blog.createPost("My first post", "12345");

    const posts = await blog.fetchPosts();
    expect(posts[0].title).to.equal("My first post");
  })

  it("Should edit a post", async function() {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();

    await blog.createPost("My second post", "12345");
    await blog.updatePost(1, "My updated post", "23456", true);

    const posts = await blog.fetchPosts();
    expect(posts[0].title).to.equal("My updated post");
  });

  it("Should update a name", async function() {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();

    expect(await blog.name()).to.equal("My blog");
    await blog.updateName("My new blog");
    expect(await blog.name()).to.equal("My new blog");
  });
});
