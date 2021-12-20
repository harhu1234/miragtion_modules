# -*- coding: utf-8 -*-
##############################################################################
#
#    Harhu IT Solutions
#    Copyright (C) 2020-TODAY Harhu IT Solutions(<https://www.harhu.com>).
#    Author: Harhu IT Solutions(<https://www.harhu.com>)
#    you can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    It is forbidden to publish, distribute, sublicense, or sell copies
#    of the Software or modified copies of the Software.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    GENERAL PUBLIC LICENSE (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import http
from odoo.http import route, request

class JtAbout(http.Controller):
    @http.route('/jt-about',auth='public',website=True)
    def jtabout(self, **kw):
        return http.request.render('jt_theme.jt_about_page')

class JtTeam(http.Controller):
    @http.route('/jt-team',auth='public',website=True)
    def jtteam(self, **kw):
        return http.request.render('jt_theme.jt_team_page')

class JtProject(http.Controller):
    @http.route('/jt-project',auth='public',website=True)
    def jtproject(self, **kw):
        return http.request.render('jt_theme.jt_project_page')

class JtServices(http.Controller):
    @http.route('/jt-services',auth='public',website=True)
    def jtservices(self, **kw):
        return http.request.render('jt_theme.jt_services_page')

class Jtblog(http.Controller):
    @http.route([
        '/jt-blog',
        '/jt-blog/page/<int:page>',
        '/jt-blog/tag/<string:tag>',
        '/jt-blog/tag/<string:tag>/page/<int:page>',
        '''/jt-blog/<model("blog.blog"):blog>''',
        '''/jt-blog/<model("blog.blog"):blog>/page/<int:page>''',
        '''/jt-blog/<model("blog.blog"):blog>/tag/<string:tag>''',
        '''/jt-blog/<model("blog.blog"):blog>/tag/<string:tag>/page/<int:page>''',
    ], type='http', auth="public", website=True, sitemap=True)

    def jtblog(self, blog=None, tag=None, page=1, search=None, **opt):
        Blog = request.env['blog.blog']
        if blog and not blog.can_access_from_current_website():
            raise werkzeug.exceptions.NotFound()

        blogs = Blog.search(request.website.website_domain(), order="create_date asc, id asc")

        if not blog and len(blogs) == 1:
            return werkzeug.utils.redirect('/jt-blog/%s' % slug(blogs[0]), code=302)

        date_begin, date_end, state = opt.get('date_begin'), opt.get('date_end'), opt.get('state')

        if tag and request.httprequest.method == 'GET':
            # redirect get tag-1,tag-2 -> get tag-1
            tags = tag.split(',')
            if len(tags) > 1:
                url = QueryURL('' if blog else '/jt-blog', ['blog', 'tag'], blog=blog, tag=tags[0], date_begin=date_begin, date_end=date_end, search=search)()
                return request.redirect(url, code=302)

        values = self._prepare_blog_values(blogs=blogs, blog=blog, date_begin=date_begin, date_end=date_end, tags=tag, state=state, page=page, search=search)

        # in case of a redirection need by `_prepare_blog_values` we follow it
        if isinstance(values, werkzeug.wrappers.Response):
            return values

        if blog:
            values['main_object'] = blog
            values['edit_in_backend'] = True
            values['blog_url'] = QueryURL('', ['blog', 'tag'], blog=blog, tag=tag, date_begin=date_begin, date_end=date_end, search=search)
        else:
            values['blog_url'] = QueryURL('/jt-blog', ['tag'], date_begin=date_begin, date_end=date_end, search=search)

        return request.render("jt_theme.jt_blog_page", values)








class Jtcontact(http.Controller):
    @http.route('/jt-contact',auth='public',website=True)
    def jtcontact(self, **kw):
        return http.request.render('jt_theme.jt_contact_page')