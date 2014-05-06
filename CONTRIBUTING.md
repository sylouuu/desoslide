# Contribution guidelines

Thank's for your interest of desoSlide!

Please follow this basic guidelines if you want to get involved.

## Reporting issues

A bug is a _demonstrable problem_ that is caused by the code in the
repository.

Please read the following guidelines before you [report an issue][issues]:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported. If it has been, please comment on the existing issue.

2. **Check if the issue has been fixed** &mdash; the latest `master` or
   development branch may already contain a fix.

3. **Isolate the demonstrable problem** &mdash; make sure that the code in the
   project's repository is _definitely_ responsible for the issue. Create a
   [reduced test case](http://css-tricks.com/6263-reduced-test-cases/) - an
   extremely simple and immediately viewable example of the issue.

4. **Include a live example** &mdash; provide a link to your reduced test case
   when appropriate (e.g. if the issue is related to (front-end technologies).
   Please use [jsFiddle](http://jsfiddle.net) to host examples.

Please try to be as detailed as possible in your report too. What is your
environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to assess and fix any potential bugs.

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

## Pull Requests

Good pull requests — patches, improvements, new features — are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

If your contribution involves a significant amount of work or substantial
changes to any part of the project, please open an issue to discuss it first.

Please follow this process; it's the best way to get your work included in the
project:

1. [Fork](http://help.github.com/fork-a-repo/) the project.

2. Clone your fork (`git clone
   https://github.com/<your-username>/desoslide.git`).

3. Add an `upstream` remote (`git remote add upstream
   https://github.com/sylouuu/desoslide.git`).

4. Get the latest changes from upstream (e.g. `git pull upstream
   <dev-branch>`).

5. Create a new topic branch to contain your feature, change, or fix (`git
   checkout -b <topic-branch-name>`).

6. Make sure that your changes adhere to the current coding conventions used
   throughout the project - indentation, accurate comments, etc. Please update
   any documentation that is relevant to the change you are making.

7. Commit your changes in logical chunks; use git's [interactive
   rebase](https://help.github.com/articles/interactive-rebase) feature to tidy
   up your commits before making them public. Please adhere to these [git commit
   message
   guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your pull request is unlikely be merged into the main project.

8. Locally merge (or rebase) the upstream branch into your topic branch.

9. Push your topic branch up to your fork (`git push origin
   <topic-branch-name>`).

10. [Open a Pull Request](http://help.github.com/send-pull-requests/) with a
    clear title and description. Please mention which browsers you tested in.

## Acknowledgements

This contributing guide has been adapted from [HTML5 boilerplate's guide][g].

[g]: https://github.com/h5bp/html5-boilerplate/blob/master/CONTRIBUTING.md
[issues]: https://github.com/sylouuu/desoslide/issues/
