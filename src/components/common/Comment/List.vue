<template lang="html">
<div class="comments">
  <h2>留言（共{{comments.length}}条）</h2>
  <ul class = "comment-list">
    <ListItem v-for = "comment in comments" key="{{ comment.id }}" :data = "comment">
    </ListItem>
  </ul>
  <h2>说说您的看法</h2>
  <AddForm>
  </AddForm>
</div>
</template>

<script>
import ListItem from './ListItem.vue';
import AddForm from './AddForm.vue';
export default {
  name: 'comments-list',
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  components: {
    ListItem,
    AddForm
  }
}
</script>

<style lang="css">
  .comments{
    margin-top: 100px;
  }
  .comment-list{
    padding: 0;
    margin-bottom: 100px;
  }
</style>
