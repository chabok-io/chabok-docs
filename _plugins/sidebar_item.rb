module Jekyll
  module SidebarItemFilter
    def docs_sidebar_link(item, baseurl = '')
      return sidebar_helper(item, 'docs', baseurl)
    end

    def ios_sidebar_link(item, baseurl = '')
      return sidebar_helper(item, 'ios', baseurl)
    end

    def android_sidebar_link(item, baseurl = '')
      return sidebar_helper(item, 'android', baseurl)
    end

    def glossary_sidebar_link(item, baseurl = '')
      return sidebar_helper(item, 'glossary', baseurl)
    end

    def unity_sidebar_link(item, baseurl = '')
        return sidebar_helper(item, 'unity', baseurl)
    end

    def flutter_sidebar_link(item, baseurl = '')
        return sidebar_helper(item, 'flutter', baseurl)
    end

    def cordova_sidebar_link(item, baseurl = '')
        return sidebar_helper(item, 'cordova', baseurl)
    end

    def faq_sidebar_link(item, baseurl = '')
        return sidebar_helper(item, 'faq', baseurl)
    end

    def windows_sidebar_link(item, baseurl = '')
      return sidebar_helper(item, 'windows', baseurl)
    end

    def guides_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'guides', baseurl)
    end

    def mobile_usecases_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'mobile-usecases', baseurl)
    end

    def panel_sidebar_link(item, baseurl = '')
        return sidebar_helper(item, 'panel', baseurl)
    end

    def javascript_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'javascript', baseurl)
    end

    def react_native_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'react-native', baseurl)
    end

    def react_native_bridge_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'react-native-bridge', baseurl)
    end

    def rest_api_sidebar_link(item, baseurl = '')
          return sidebar_helper(item, 'rest-api', baseurl)
    end

    def sidebar_helper(item, group, baseurl)
      forceInternal = item["forceInternal"]

      subItems = item["subitems"]
      pageID = @context.registers[:page]["id"]
      itemID = item["id"]
      if item["href"] != nil
        href = "#{pageID}.html##{item["href"]}" || "/#{group}/#{itemID}.html"
        itemID = pageID
      else
        href = item["href"] || "/#{group}/#{itemID}.html"
      end
      classes = []
      if pageID == itemID
        classes.push("active")
      end
      if item["href"] && (forceInternal == nil)
        classes.push("external")
      end
      className = classes.size > 0  ? " class=\"#{classes.join(' ')}\"" : ""

      result = ""
      if subItems != nil && pageID == itemID
        result = "<ul><a href=\"#{baseurl}#{href}\"#{className}>#{item["title"]}</a>"
        subItems.each {|curItem|
          result += "<li><a style='font-size: 12px;' href=\"#{baseurl}#{href}##{curItem["href"]}\">#{curItem["title"]}</a></li>"
        }
        result += "</ul>"
      else
        result = "<a href=\"#{baseurl}#{href}\"#{className}>#{item["title"]}</a>"
      end
      return result
    end

  end
end

Liquid::Template.register_filter(Jekyll::SidebarItemFilter)
