var privateWelcome = privateWelcome || {};

privateWelcome.init = function() {
  privateWelcome.checkboxes = $('.is_public');
  $('.is_public').on('click', function(e) {
    $.ajax({
      method: 'POST',
      url: '/updatePost',
      data: {
        id: e.target.value,
        public: e.target.checked
      }
    })
    .done(function() {
			console.log('Success');
		})
		.fail(function() {
			alert('Error updating post');
		});
  });
};

$(document).ready(privateWelcome.init);
